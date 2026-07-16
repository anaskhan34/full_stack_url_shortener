import { eq } from "drizzle-orm";
import { db } from "../config/db.js";
import { shortLinks } from "../drizzle/schema.js";

export const getAllShortLinks = async () => {
  return await db.select().from(shortLinks);
};

export const checkingShortLink = async (shortCode) => {
  const [link] = await db
    .select()
    .from(shortLinks)
    .where(eq(shortLinks.short_code, shortCode));

  return link;
};
export const postShortLink = async ({ url, shortCode }) => {
  return await db.insert(shortLinks).values({
    url,
    short_code: shortCode,
  });
};
