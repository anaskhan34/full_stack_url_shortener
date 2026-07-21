import { relations } from "drizzle-orm";
import { int, mysqlTable, varchar, timestamp } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int().autoincrement().primaryKey(),

  name: varchar("name", { length: 255 }).notNull(),

  email: varchar("email", { length: 255 }).notNull().unique(),

  password: varchar("password", { length: 255 }).notNull(),

  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),

  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull()
    .onUpdateNow(),
});

export const shortLinks = mysqlTable("links_shortener", {
  id: int().primaryKey().autoincrement(),

  short_code: varchar("short_code", { length: 20 }).notNull().unique(),

  url: varchar("url", { length: 200 }).notNull(),

  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),

  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull()
    .onUpdateNow(),

  userId: int("user_id")
    .notNull()
    .references(() => users.id),
});

// User -> ShortLinks (1:N)
export const userRelations = relations(users, ({ many }) => ({
  shortLinks: many(shortLinks),
}));

// ShortLink -> User (N:1)
export const shortLinkRelations = relations(shortLinks, ({ one }) => ({
  user: one(users, {
    fields: [shortLinks.userId],
    references: [users.id],
  }),
}));
