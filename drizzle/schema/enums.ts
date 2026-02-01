import { pgEnum } from "drizzle-orm/pg-core";

export const userTypeEnum = pgEnum("UserType", [
  "USER",
  "MANAGER",
  "ADMIN",
  "SUPER",
  "OWNER",
  "UNKNOWN",
]);

export const statusEnum = pgEnum("Status", [
  "DRAFT",
  "INACTIVE",
  "ACTIVE",
  "CLOSED",
  "CANCELED",
  "DISABLED",
  "LOCKED",
  "DELETED",
  "PAID",
  "PENDING",
  "FAILED",
  "UNCLAIMED",
]);

export const emailStatusEnum = pgEnum("EmailStatus", [
  "IDLE",
  "DRAFT",
  "PENDING",
  "SENT",
  "DELIVERED",
  "COMPLAINED",
  "DELIVEREY_DELAYED",
  "BOUNCED",
]);
