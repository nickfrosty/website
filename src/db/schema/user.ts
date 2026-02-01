import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import {
  pgTable,
  varchar,
  integer,
  text,
  timestamp,
  uniqueIndex,
  index,
  boolean,
  json,
  unique,
  serial,
} from "drizzle-orm/pg-core";
import { userTypeEnum, statusEnum } from "./enums";

export const users = pgTable(
  "User",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    uid: serial("uid").notNull().unique(),
    username: varchar("username", { length: 255 })
      .notNull()
      .unique()
      .$defaultFn(() => crypto.randomUUID()),
    name: text("name"),
    email: text("email").unique(),
    emailVerified: timestamp("emailVerified", { mode: "date" }),
    image: text("image"),
    type: userTypeEnum("type").default("USER"),
    status: statusEnum("status").default("ACTIVE"),
    flags: varchar("flags", { length: 500 }),
    createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),
    updatedAt: timestamp("updatedAt", { mode: "date" }),
  },
  table => [
    index("user_id_idx").on(table.id),
    index("user_email_idx").on(table.email),
    index("user_username_idx").on(table.username),
    index("user_uid_idx").on(table.uid),
  ],
);

export type User = InferSelectModel<typeof users>;
export type NewUser = InferInsertModel<typeof users>;

export const profiles = pgTable(
  "Profile",
  {
    username: varchar("username", { length: 255 }).primaryKey(),
    title: text("title"),
    name: text("name"),
    image: text("image"),
    bio: varchar("bio", { length: 255 }).default(""),
    verified: boolean("verified").notNull().default(false),
    flags: varchar("flags", { length: 500 }),
    status: statusEnum("status").default("ACTIVE"),
  },
  table => [index("profile_username_idx").on(table.username)],
);

export type Profile = InferSelectModel<typeof profiles>;
export type NewProfile = InferInsertModel<typeof profiles>;

export const accounts = pgTable(
  "Account",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    userId: text("userId").notNull(),
    type: text("type").notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    refresh_token_expires_in: integer("refresh_token_expires_in"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
    provider_profile: json("provider_profile").default({}),
  },
  table => [
    unique("provider_and_account_id_idx").on(table.provider, table.providerAccountId),
    index("provider_account_id_idx").on(table.providerAccountId),
    index("provider_user_id_idx").on(table.userId),
  ],
);

export type Account = InferSelectModel<typeof accounts>;
export type NewAccount = InferInsertModel<typeof accounts>;

export const sessions = pgTable(
  "Session",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    sessionToken: text("sessionToken").notNull().unique(),
    userId: text("userId").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  table => [index("session_user_id_idx").on(table.userId)],
);

export type Session = InferSelectModel<typeof sessions>;
export type NewSession = InferInsertModel<typeof sessions>;

export const verificationTokens = pgTable(
  "VerificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull().unique(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  table => [unique().on(table.identifier, table.token)],
);

export type VerificationToken = InferSelectModel<typeof verificationTokens>;
export type NewVerificationToken = InferInsertModel<typeof verificationTokens>;
