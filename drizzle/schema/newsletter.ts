import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";
import {
  pgTable,
  varchar,
  text,
  integer,
  timestamp,
  boolean,
  index,
  serial,
  doublePrecision,
} from "drizzle-orm/pg-core";
import { statusEnum, emailStatusEnum } from "./enums";

export const newsletterSubscribers = pgTable("NewsletterSubscriber", {
  id: serial("id").notNull().unique(),
  email: text("email").notNull().unique(),
  name: text("name"),
  image: text("image"),
  bio: varchar("bio", { length: 255 }).default(""),
  website: text("website"),
  twitter: text("twitter"),
  github: text("github"),
  telegram: text("telegram"),
  wallet: text("wallet"),
  tags: text("tags"),
  verified: boolean("verified").notNull().default(false),
  flags: varchar("flags", { length: 500 }),
  status: statusEnum("status").default("PENDING"),
  dateAdded: timestamp("dateAdded", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updatedAt", { mode: "date" }).defaultNow().notNull(),
});

export type NewsletterSubscriber = InferSelectModel<typeof newsletterSubscribers>;
export type NewNewsletterSubscriber = InferInsertModel<typeof newsletterSubscribers>;

export const newsletterSubscriberTransactions = pgTable(
  "NewsletterSubscriberTransaction",
  {
    id: serial("id").notNull().unique(),
    solFee: doublePrecision("solFee").notNull(),
    wallet: text("wallet").notNull(),
    email: text("email").notNull(),
    referenceKey: text("referenceKey").notNull(),
    transactionId: text("transactionId"),
    status: statusEnum("status").default("PENDING"),
    dateAdded: timestamp("dateAdded", { mode: "date" }).defaultNow().notNull(),
    updatedAt: timestamp("updatedAt", { mode: "date" }).defaultNow().notNull(),
  },
  table => [
    index("newsletter_transaction_wallet").on(table.wallet),
    index("newsletter_transaction_email").on(table.email),
    index("newsletter_transaction_reference_key").on(table.referenceKey),
    index("newsletter_transaction_transaction_id").on(table.transactionId),
  ],
);

export type NewsletterSubscriberTransaction = InferSelectModel<
  typeof newsletterSubscriberTransactions
>;
export type NewNewsletterSubscriberTransaction = InferInsertModel<
  typeof newsletterSubscriberTransactions
>;

export const newsletterPosts = pgTable(
  "NewsletterPost",
  {
    id: serial("id").notNull().unique(),
    key: text("key")
      .notNull()
      .unique()
      .$defaultFn(() => createId()),
    name: text("name").notNull(),
    slug: text("slug"),
    content: text("content").notNull(),
    dateCreated: timestamp("dateCreated", { mode: "date" }).defaultNow().notNull(),
    dateUpdated: timestamp("dateUpdated", { mode: "date" }).notNull(),
    status: statusEnum("status").default("DRAFT"),
    flags: varchar("flags", { length: 500 }),
    blastStarted: timestamp("blastStarted", { mode: "date" }),
    blastEnded: timestamp("blastEnded", { mode: "date" }),
    blastStatus: emailStatusEnum("blastStatus").default("IDLE"),
  },
  table => [index("newsletter_post_blast_status").on(table.blastStatus)],
);

export type NewsletterPost = InferSelectModel<typeof newsletterPosts>;
export type NewNewsletterPost = InferInsertModel<typeof newsletterPosts>;

export const newsletterPostsForSubscribers = pgTable(
  "NewsletterPostForSubscriber",
  {
    id: serial("id").notNull().unique(),
    subscriberId: integer("subscriberId").notNull(),
    postId: integer("postId").notNull(),
    dateCreated: timestamp("dateCreated", { mode: "date" }).defaultNow().notNull(),
    dateUpdated: timestamp("dateUpdated", { mode: "date" }).notNull(),
    content: text("content").notNull(),
    emailId: text("emailId").default(""),
    status: emailStatusEnum("status").default("PENDING"),
    openCount: integer("openCount").default(0),
  },
  table => [
    index("newsletter_post_for_subscriber_post_id").on(table.postId),
    index("newsletter_post_for_subscriber_email_id").on(table.emailId),
    index("newsletter_post_for_subscriber_sbuscriber_id").on(table.subscriberId),
  ],
);

export type NewsletterPostForSubscriber = InferSelectModel<typeof newsletterPostsForSubscribers>;
export type NewNewsletterPostForSubscriber = InferInsertModel<typeof newsletterPostsForSubscribers>;

export const newsletterPostLinksForSubscribers = pgTable(
  "NewsletterPostLinkForSubscriber",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    postForSubscriberId: integer("postForSubscriberId").notNull(),
    destination: text("destination").notNull(),
    clickCount: integer("clickCount").default(0),
    lastOpened: timestamp("lastOpened", { mode: "date" }),
    status: statusEnum("status").notNull().default("ACTIVE"),
  },
  table => [index("newsletter_post_link_for_subscriber_id").on(table.postForSubscriberId)],
);

export type NewsletterPostLinkForSubscriber = InferSelectModel<
  typeof newsletterPostLinksForSubscribers
>;
export type NewNewsletterPostLinkForSubscriber = InferInsertModel<
  typeof newsletterPostLinksForSubscribers
>;
