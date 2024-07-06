import { TREASURY_PUBKEY } from "@/lib/constants";
import prisma from "@/lib/prisma/client";
import {
  ActionGetResponse,
  ACTIONS_CORS_HEADERS,
  ActionPostRequest,
  createPostResponse,
  ActionPostResponse,
  MEMO_PROGRAM_ID,
} from "@solana/actions";
import {
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";
import { z, ZodError } from "zod";

export const GET = async (req: Request) => {
  const payload: ActionGetResponse = {
    icon: new URL(
      "/img/blink-newsletter.jpg",
      new URL(req.url).origin,
    ).toString(),
    label: "Subscribe", // expected to be ignored since `links.actions` are provided
    title: "Nick Frostbutter - Subscribe to my newsletter?",
    description:
      "Building in public, sharing as I go.\n" +
      "Subscribe for (sometimes) weekly emails directly from me.\n" +
      "Devlog and assorted tech things. ~7min read.",
    links: {
      actions: [
        {
          href: "/api/actions/newsletter?email={email}",
          label: "Subscribe", // button text
          parameters: [
            {
              name: "email", // name of template literal
              label: "Enter your email address", // placeholder for the input
            },
          ],
        },
      ],
    },
  };

  return Response.json(payload, {
    headers: ACTIONS_CORS_HEADERS,
  });
};

export const OPTIONS = GET;

export const POST = async (req: Request) => {
  try {
    const url = new URL(req.url);

    const body: ActionPostRequest = await req.json();

    let account: PublicKey;
    try {
      account = new PublicKey(body.account);
    } catch (err) {
      throw "Invalid 'account' provided. Its not a real pubkey";
    }

    if (!url.searchParams.has("email")) {
      throw "An email address is required";
    }

    const email: string = z
      .string()
      .trim()
      .email("Invalid email address")
      .parse(url.searchParams.get("email"));

    const SOLANA_RPC_URL = process.env.SOLANA_RPC_URL!;
    if (!SOLANA_RPC_URL) throw "Unable to find RPC url...awkward...";
    const connection = new Connection(SOLANA_RPC_URL);

    // setting a small fee helps prevent botting (or at least pays me to deal with bots)
    const subscribeSolFee: number = 0.001; // ~$0.14 at SOL=$135

    // generate a reference key to track the transaction on chain
    const referenceKeypair = Keypair.generate();

    // store the ref key in the database with the submitted wallet address
    try {
      const subscriberTransaction =
        await prisma.newsletterSubscriberTransaction.create({
          data: {
            email,
            solFee: subscribeSolFee,
            wallet: account.toBase58(),
            referenceKey: referenceKeypair.publicKey.toBase58(),
            // pending until we verify it using `getSignaturesForAddress` on the ref key
            status: "PENDING",
            // empty since we will not have this until the transaction is signed by the user
            transactionId: "",
          },
        });

      if (!subscriberTransaction) throw "Unable to create the subscribe record";
    } catch (err) {
      throw "Unable to subscribe you...try again?";
    }

    const transaction = new Transaction().add(
      new TransactionInstruction({
        programId: new PublicKey(MEMO_PROGRAM_ID),
        data: Buffer.from(
          "Subscribing to this newsletter via a blink at https://nick.af/newsletter",
          "utf8",
        ),
        // Adding any keys will trigger the memo instruction to require they sign
        // which would implicitly result in a transaction failure since they are not signing
        keys: [],
      }),
      SystemProgram.transfer({
        fromPubkey: account,
        lamports: subscribeSolFee * LAMPORTS_PER_SOL,
        toPubkey: TREASURY_PUBKEY,
      }),
    );

    // a non-signer reference key cannot be added to a memo ix or else
    // the transaction must be signed (which we want to avoid)
    const NON_MEMO_IX_INDEX = 1;

    // inject a reference key to track this transaction on chain
    transaction.instructions[NON_MEMO_IX_INDEX].keys.push({
      pubkey: referenceKeypair.publicKey,
      isWritable: false,
      isSigner: false,
    });

    // finalize the transaction data we need
    transaction.feePayer = account;
    transaction.recentBlockhash = (
      await connection.getLatestBlockhash()
    ).blockhash;

    const payload: ActionPostResponse = await createPostResponse({
      fields: {
        transaction,
        message: "Thanks for subscribing to my email newsletter fren :)",
      },
    });

    return Response.json(payload, {
      headers: ACTIONS_CORS_HEADERS,
    });
  } catch (err) {
    let message = "An unknown error occurred";
    if (typeof err == "string") message = err;

    if (err instanceof ZodError) {
      message =
        err.errors?.[0]?.message || "Input validation error. Try again.";
    }

    return Response.json(
      {
        message,
      },
      {
        headers: ACTIONS_CORS_HEADERS,
      },
    );
  }
};
