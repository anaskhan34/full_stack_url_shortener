import { int, mysqlTable, varchar, timestamp } from "drizzle-orm/mysql-core";

export const shortLinks = mysqlTable("links_shortener", {
  id: int().primaryKey().autoincrement(),
  short_code: varchar("short_code", { length: 20 }).notNull().unique(),
  url: varchar({ length: 200 }).notNull(),
});

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
