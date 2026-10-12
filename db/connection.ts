import mongoose, { type ConnectOptions } from 'mongoose';

/**
 * Interface representing the cached connection object stored on globalThis.
 */
interface MongooseConnectionCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

/**
 * Extend globalThis to preserve connection state across warm Cloudflare Worker
 * / serverless invocations and Next.js HMR reloads.
 */
declare global {
  var _mongooseCache: MongooseConnectionCache | undefined;
}

const cached: MongooseConnectionCache = globalThis._mongooseCache ?? {
  conn: null,
  promise: null,
};

if (!globalThis._mongooseCache) {
  globalThis._mongooseCache = cached;
}

/**
 * Default connection options tuned for Cloudflare Workers / Serverless V8 runtimes:
 * - bufferCommands: false to fail fast instead of hanging when disconnected.
 * - maxPoolSize: small pool to avoid socket exhaustion across scaling worker instances.
 * - serverSelectionTimeoutMS: 5s timeout to fail quickly rather than hitting worker execution limits.
 */
const DEFAULT_CONNECT_OPTIONS: ConnectOptions = {
  bufferCommands: false,
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  connectTimeoutMS: 10000,
};

export interface ConnectDBOptions extends ConnectOptions {
  uri?: string;
}

/**
 * Connect to MongoDB with connection reuse and serverless/edge runtime resilience.
 */
export async function connectDB(options?: ConnectDBOptions): Promise<typeof mongoose> {
  const uri = options?.uri || process.env.MONGODB_URI || process.env.MONGO_URI;

  if (!uri) {
    throw new Error(
      'Missing MongoDB connection string. Please define MONGODB_URI in your environment variables.'
    );
  }

  // If already connected and socket is active (readyState === 1: connected)
  if (cached.conn && mongoose.connection.readyState === 1) {
    return cached.conn;
  }

  // If connection was disconnected or terminating, clear stale cache
  if (mongoose.connection.readyState === 0 || mongoose.connection.readyState === 3) {
    cached.conn = null;
    cached.promise = null;
  }

  // If a connection attempt is already in flight, reuse the pending promise
  if (!cached.promise) {
    const mongooseOpts: ConnectOptions = options ? { ...options } : {};
    delete (mongooseOpts as ConnectDBOptions).uri;
    const mergedOptions: ConnectOptions = {
      ...DEFAULT_CONNECT_OPTIONS,
      ...mongooseOpts,
    };

    cached.promise = mongoose
      .connect(uri, mergedOptions)
      .then((mongooseInstance) => {
        return mongooseInstance;
      })
      .catch((error) => {
        // Clear cached promise on failure to allow subsequent calls to retry
        cached.promise = null;
        cached.conn = null;
        throw error;
      });
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    cached.promise = null;
    cached.conn = null;
    throw error;
  }
}

/**
 * Explicitly disconnect from MongoDB. Useful for cleanup, test suites, or maintenance.
 */
export async function disconnectDB(): Promise<void> {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
  cached.conn = null;
  cached.promise = null;
}

/**
 * Get current mongoose connection state and diagnostic info.
 */
export function getConnectionState(): {
  readyState: number;
  isConnected: boolean;
  state: 'disconnected' | 'connected' | 'connecting' | 'disconnecting' | 'uninitialized';
} {
  const readyState = mongoose.connection.readyState;
  const states: Record<number, 'disconnected' | 'connected' | 'connecting' | 'disconnecting'> = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting',
  };

  return {
    readyState,
    isConnected: readyState === 1,
    state: states[readyState] ?? 'uninitialized',
  };
}

export default connectDB;
