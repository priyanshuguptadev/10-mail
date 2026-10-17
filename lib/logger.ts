export type LogLevel = 'debug' | 'info' | 'warn' | 'error'

export interface LogPayload {
  level: LogLevel
  message: string
  timestamp: string
  app: string
  environment: string
  [key: string]: unknown
}

function formatLog(
  level: LogLevel,
  message: string,
  data?: Record<string, unknown>,
): LogPayload {
  return {
    level,
    message,
    timestamp: new Date().toISOString(),
    app: '10-mail',
    environment: process.env.NODE_ENV ?? 'unknown',
    ...data,
  }
}

export const logger = {
  debug(message: string, data?: Record<string, unknown>) {
    if (process.env.NODE_ENV !== 'production') {
      console.debug(formatLog('debug', message, data))
    }
  },

  info(message: string, data?: Record<string, unknown>) {
    console.log(formatLog('info', message, data))
  },

  warn(message: string, data?: Record<string, unknown>) {
    console.warn(formatLog('warn', message, data))
  },

  error(message: string, err?: unknown, data?: Record<string, unknown>) {
    let errorInfo: Record<string, unknown> | undefined

    if (err instanceof Error) {
      const errWithDigest = err as Error & { digest?: unknown }
      const digest =
        typeof errWithDigest.digest === 'string'
          ? errWithDigest.digest
          : undefined

      errorInfo = {
        name: err.name,
        message: err.message,
        stack: err.stack,
        ...(digest ? { digest } : {}),
      }
    } else if (err !== undefined) {
      errorInfo = { message: String(err) }
    }

    console.error(
      formatLog('error', message, {
        ...(errorInfo ? { error: errorInfo } : {}),
        ...data,
      }),
    )
  },
}
