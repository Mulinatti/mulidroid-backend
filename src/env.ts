import z from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().url().default("postgresql://mulidroid:mdroid@pg:5432/mulidroid"),
  PORT: z.string().default("10000")
});

export const env = envSchema.parse(process.env);