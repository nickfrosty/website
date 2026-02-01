import { relations } from "drizzle-orm";

import {
  users,
  profiles,
  accounts,
  sessions,
  newsletterSubscribers,
  newsletterPosts,
  newsletterPostsForSubscribers,
  newsletterPostLinksForSubscribers,
} from ".";

// User relations
export const usersRelations = relations(users, ({ one, many }) => ({
  profile: one(profiles, {
    fields: [users.username],
    references: [profiles.username],
  }),
  accounts: many(accounts),
  sessions: many(sessions),
}));

// Profile relations
export const profilesRelations = relations(profiles, ({ one }) => ({
  user: one(users, {
    fields: [profiles.username],
    references: [users.username],
  }),
}));

// Account relations
export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, {
    fields: [accounts.userId],
    references: [users.id],
  }),
}));

// Session relations
export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));

// Newsletter subscriber relations
export const newsletterSubscribersRelations = relations(newsletterSubscribers, ({ many }) => ({
  postsForSubscriber: many(newsletterPostsForSubscribers),
}));

// Newsletter post relations
export const newsletterPostsRelations = relations(newsletterPosts, ({ many }) => ({
  postsForSubscriber: many(newsletterPostsForSubscribers),
}));

// Newsletter post for subscriber relations
export const newsletterPostsForSubscribersRelations = relations(
  newsletterPostsForSubscribers,
  ({ one, many }) => ({
    subscriber: one(newsletterSubscribers, {
      fields: [newsletterPostsForSubscribers.subscriberId],
      references: [newsletterSubscribers.id],
    }),
    post: one(newsletterPosts, {
      fields: [newsletterPostsForSubscribers.postId],
      references: [newsletterPosts.id],
    }),
    links: many(newsletterPostLinksForSubscribers),
  }),
);

// Newsletter post link for subscriber relations
export const newsletterPostLinksForSubscribersRelations = relations(
  newsletterPostLinksForSubscribers,
  ({ one }) => ({
    postForSubscriber: one(newsletterPostsForSubscribers, {
      fields: [newsletterPostLinksForSubscribers.postForSubscriberId],
      references: [newsletterPostsForSubscribers.id],
    }),
  }),
);
