import { drizzle } from 'drizzle-orm/neon-http'
import { neon } from '@neondatabase/serverless'
import { relations } from './schema'

const dbUrl =
  process.env.DATABASE_URL || 'postgres://placeholder.neon.tech/neondb'
const sql = neon(dbUrl)

export const db = drizzle({ client: sql, relations })
