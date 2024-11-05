import z from "zod"

const envSchema = z.object({
	DATABASE_URL: z.string().url().default(JSON.stringify(process.env.DATABASE_URL)),
	PORT: z.string().default("10000"),
	SERVICE_EMAIL: z.string().default(JSON.stringify(process.env.SERVICE_EMAIL)),
	SERVICE_PASSWORD: z.string().default(JSON.stringify(process.env.SERVICE_PASSWORD)),
})

export const env = envSchema.parse(process.env)
