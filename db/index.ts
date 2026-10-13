import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { relations } from "./schema";

const dbUrl = process.env.DATABASE_URL
if (!dbUrl) throw new Error('DATABASE_URL not set')

const sql = neon(dbUrl);
export const db = drizzle({ client: sql, relations });
