import { and, eq } from "drizzle-orm";
import { db } from "../config/db.js";
import { shortLinks } from "../drizzle/schema.js";
import { users } from "../drizzle/schema.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

export const getAllShortLinks = async (userId) => {
  return await db
    .select()
    .from(shortLinks)
    .where(eq(shortLinks.userId, userId));
};

export const checkingShortLink = async (shortCode) => {
  const [link] = await db
    .select()
    .from(shortLinks)
    .where(eq(shortLinks.short_code, shortCode));

  return link;
};
export const postShortLink = async ({ url, shortCode, userId }) => {
  return await db.insert(shortLinks).values({
    url,
    short_code: shortCode,
    userId,
  });
};

export const checkExistEmail = async (email) => {
  const [user] = await db.select().from(users).where(eq(users.email, email));
  return user;
};

export const creatingNewUser = async ({ name, email, password }) => {
  return db.insert(users).values({
    name,
    email,
    password,
  });
};
// export const checkExistUser = async (email, password) => {
//   const [user] = await db
//     .select()
//     .from(users)
//     .where(and(eq(users.email, email), eq(users.password, password)));
//   return user;
// };

// hashing password
export const hashPassword = async (password) => {
  return await argon2.hash(password);
};

// verifying password
export const verifyPassword = async (hashPassword, password) => {
  return await argon2.verify(hashPassword, password);
};

// generate jwt token
export const generateToken = ({ id, name, email }) => {
  return jwt.sign({ id, name, email }, process.env.SECRET_KEY, {
    expiresIn: "30d",
  });
};

// verify token
export const verifyJwtToken = (token) => {
  return jwt.verify(token, process.env.SECRET_KEY);
};

//
export const getParamIdData = async (id) => {
  const [link] = await db
    .select()
    .from(shortLinks)
    .where(eq(shortLinks.id, id));

  return link;
};
getParamIdData;
