import z from "zod"

const envSchema = z.object({
	DATABASE_URL: z.string().url().default(JSON.stringify(process.env.DATABASE_URL)),
	PORT: z.string().default("10000"),
	SERVICE_EMAIL: z.string(),
	SERVICE_PASSWORD: z.string(),
})

export const env = envSchema.parse(process.env)
