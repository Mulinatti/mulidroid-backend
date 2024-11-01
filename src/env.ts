import z from "zod";
import dotenv from "dotenv";
dotenv.config();

const envSchema = z.object({
  DATABASE_URL: z.string().url().default(JSON.stringify(process.env.DATABASE_URL)),
  PORT: z.string().default("10000")
});

export const env = envSchema.parse(process.env);