import * as schema from "./schema"
import { env } from "../env"
import { drizzle } from "drizzle-orm/neon-http"
import { neon } from "@neondatabase/serverless"

export const client = neon(env.DATABASE_URL)
export const db = drizzle(client, { schema, logger: true })
