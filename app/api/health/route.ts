import { connection, NextResponse } from 'next/server'
import { sql } from 'drizzle-orm'
import { db } from '@/db'

export async function GET() {
  await connection()
  const databaseCheckStartedAt = performance.now()

  try {
    await db.execute(sql`select 1`)

    const response = {
      status: 'ok',
      timestamp: new Date().toISOString(),
      server: {
        status: 'up',
        environment: process.env.NODE_ENV ?? 'unknown',
      },
      database: {
        status: 'up',
        responseTimeMs: Math.round(performance.now() - databaseCheckStartedAt),
      },
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Health check database probe failed', error)

    return NextResponse.json(
      {
        status: 'degraded',
        timestamp: new Date().toISOString(),
        server: {
          status: 'up',
          environment: process.env.NODE_ENV ?? 'unknown',
        },
        database: {
          status: 'down',
          responseTimeMs: Math.round(
            performance.now() - databaseCheckStartedAt,
          ),
          error: 'unavailable',
        },
      },
      { status: 503 },
    )
  }
}
