import { findReference } from "@solana/actions";
import { ConfirmedSignatureInfo, Connection, PublicKey } from "@solana/web3.js";
import * as dotenv from "dotenv";

import { eq } from "drizzle-orm";

import { db, newsletterSubscriberTransactions, newsletterSubscribers } from "@/db";

dotenv.config();

const SOLANA_RPC_URL = process.env.SOLANA_RPC_URL!;
if (!SOLANA_RPC_URL) throw "Unable to find RPC url...awkward...";
const connection = new Connection(SOLANA_RPC_URL);

// get all the un validated subscribe transactions
const records = await db.query.newsletterSubscriberTransactions.findMany({
  where: eq(newsletterSubscriberTransactions.status, "PENDING"),
  orderBy: (table, { asc }) => [asc(table.dateAdded)],
});

// track the number that were actually updated
let validated: number = 0;

for (let i = 0; i < records.length; i++) {
  const record = records[i];
  console.log("record:", record);

  let confirmedSig: ConfirmedSignatureInfo | null = null;

  try {
    confirmedSig = await findReference(connection, new PublicKey(record.referenceKey));
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

  let newStatus: "PENDING" | "ACTIVE" | "FAILED" = "PENDING";

  // ensure the recorded wallet is a signer
  if (
    tx.transaction.message.accountKeys.filter(
      account => account.signer && account.pubkey.toBase58() === record.wallet,
    ).length > 0
  ) {
    console.log("is signer");

    // create the new subscriber record
    const [subscriber] = await db
      .insert(newsletterSubscribers)
      .values({
        email: record.email,
        wallet: record.wallet,
        status: "ACTIVE",
      })
      .onConflictDoUpdate({
        target: newsletterSubscribers.email,
        set: {
          wallet: record.wallet,
          status: "ACTIVE",
        },
      })
      .returning();

    if (subscriber) newStatus = "ACTIVE";
    else console.log("Failed to update record:", record.id);
  } else {
    console.log("NOT a signer");
    newStatus = "FAILED";
  }

  console.log("Updating the status...");
  const [updated] = await db
    .update(newsletterSubscriberTransactions)
    .set({
      transactionId: confirmedSig.signature,
      status: newStatus,
    })
    .where(eq(newsletterSubscriberTransactions.id, record.id))
    .returning();

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
