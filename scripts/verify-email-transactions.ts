import * as dotenv from "dotenv";
import { prisma } from "@/lib/prisma/client";
import { findReference } from "@solana/actions";
import { ConfirmedSignatureInfo, Connection, PublicKey } from "@solana/web3.js";
import { Status } from "@prisma/client";

dotenv.config();

const SOLANA_RPC_URL = process.env.SOLANA_RPC_URL!;
if (!SOLANA_RPC_URL) throw "Unable to find RPC url...awkward...";
const connection = new Connection(SOLANA_RPC_URL);

// get all the un validated subscribe transactions
const records = await prisma.newsletterSubscriberTransaction.findMany({
  where: {
    status: {
      equals: "PENDING",
    },
  },
  orderBy: {
    dateAdded: "asc",
  },
});

// track the number that were actually updated
let validated: number = 0;

for (let i = 0; i < records.length; i++) {
  const record = records[i];
  console.log("record:", record);

  let confirmedSig: ConfirmedSignatureInfo | null = null;

  try {
    confirmedSig = await findReference(
      connection,
      new PublicKey(record.referenceKey),
    );
  } catch (err) {
    // console.log(err);
    console.log("Unable to locate reference key:", record.referenceKey);
    continue;
  }

  const tx = await connection.getParsedTransaction(confirmedSig.signature, {
    maxSupportedTransactionVersion: 100,
  });

  if (!tx) {
    console.log("Unable to locate transaction:", confirmedSig.signature);
    continue;
  }

  let newStatus: Status = "PENDING";

  // ensure the recorded wallet is a signer
  if (
    tx.transaction.message.accountKeys.filter(
      (account) =>
        account.signer && account.pubkey.toBase58() === record.wallet,
    ).length > 0
  ) {
    console.log("is signer");

    // create the new subscriber record
    const subscriber = await prisma.newsletterSubscriber.upsert({
      where: { email: record.email },
      update: {
        wallet: record.wallet,
        status: "ACTIVE",
      },
      create: {
        email: record.email,
        wallet: record.wallet,
        status: "ACTIVE",
      },
    });

    if (subscriber) newStatus = "ACTIVE";
    else console.log("Failed to update record:", record.id);
  } else {
    console.log("NOT a signer");
    newStatus = "FAILED";
  }

  console.log("Updating the status...");
  const updated = await prisma.newsletterSubscriberTransaction.update({
    where: {
      id: record.id,
    },
    data: {
      transactionId: confirmedSig.signature,
      status: newStatus,
    },
  });

  if (updated) {
    console.log("Updated record:", record.id);
    if (newStatus == "ACTIVE") validated++;
  }
}

console.log("\n");
console.log("===================================");
console.log(`  All subscribe transaction records processed!`);
console.log(`  Total: ${records.length}`);
console.log(`  Validated: ${validated}`);
console.log("===================================", "\n");
