import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { pgTable, text, integer, timestamp, index, serial } from "drizzle-orm/pg-core";

export const pageViews = pgTable(
  "PageView",
  {
    id: serial("id").notNull().unique(),
    identityHash: text("identityHash").notNull(),
    route: text("route").notNull(),
    referer: text("referer").default(""),
    os: text("os").default(""),
    location: text("location").default(""),
    timestamp: timestamp("timestamp", { mode: "date" }).defaultNow().notNull(),
  },
  table => [
    index("page_view_identity_hash").on(table.identityHash),
    index("page_view_route").on(table.route),
  ],
);

export type PageView = InferSelectModel<typeof pageViews>;
export type NewPageView = InferInsertModel<typeof pageViews>;

export const pageViewCounters = pgTable("PageViewCounter", {
  route: text("route").primaryKey(),
  count: integer("count").notNull().default(1),
});

export type PageViewCounter = InferSelectModel<typeof pageViewCounters>;
export type NewPageViewCounter = InferInsertModel<typeof pageViewCounters>;
