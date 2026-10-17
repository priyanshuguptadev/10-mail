import { connection, NextResponse } from 'next/server'
import { sql } from 'drizzle-orm'
import { db } from '@/db'
import { logger } from '@/lib/logger'

export async function GET() {
  await connection()
  const databaseCheckStartedAt = performance.now()

  try {
    await db.execute(sql`select 1`)
    const responseTimeMs = Math.round(
      performance.now() - databaseCheckStartedAt,
    )

    const response = {
      status: 'ok',
      timestamp: new Date().toISOString(),
      server: {
        status: 'up',
        environment: process.env.NODE_ENV ?? 'unknown',
      },
      database: {
        status: 'up',
        responseTimeMs,
      },
    }

    logger.debug('Health check probe succeeded', {
      component: 'health',
      databaseResponseTimeMs: responseTimeMs,
    })

    return NextResponse.json(response)
  } catch (error) {
    const responseTimeMs = Math.round(
      performance.now() - databaseCheckStartedAt,
    )

    logger.error('Health check database probe failed', error, {
      component: 'health',
      databaseResponseTimeMs: responseTimeMs,
    })

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
