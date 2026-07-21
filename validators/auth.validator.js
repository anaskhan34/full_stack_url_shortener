import z from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .email({ message: "Please enter a valid email" })
    .max(100, { message: "Email must be no more than 100 characters" }),
  password: z
    .string()
    .trim()
    .min(6, { error: "Password must be at least 6 characters long" })
    .max(100, { error: "Password must be no more than 100 characters" }),
});

export const registerSchema = loginSchema.extend({
  name: z
    .string()
    .trim()
    .min(3, { message: "Name must be at least 3 characters long" })
    .max(100, { message: "Name must be no more than 100 characters" }),
});

// export const { data: id } = z.coerce.number().int().safeParse("14");
// console.log(id);
