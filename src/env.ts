import z from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().url().default("postgresql://mulidroid_owner:8CIi5xzUXoVt@ep-old-dew-a5bc1fzw.us-east-2.aws.neon.tech/mulidroid?sslmode=require"),
  PORT: z.string().default("4040")
});

export const env = envSchema.parse(process.env);