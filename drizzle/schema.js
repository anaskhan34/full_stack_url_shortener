import { int, mysqlTable, varchar } from "drizzle-orm/mysql-core";

export const shortLinks = mysqlTable("links_shortener", {
  id: int().primaryKey().autoincrement(),
  short_code: varchar("short_code", { length: 20 }).notNull().unique(),
  url: varchar({ length: 200 }).notNull(),
});
