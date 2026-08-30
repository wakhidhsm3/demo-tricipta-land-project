/**
 * In-memory sliding window rate limiter for server actions and sensitive endpoints.
 * Protects against automated spam requests and abuse with lazy on-access memory cleanup.
 */

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();
const MAX_STORE_SIZE = 10000;

/**
 * Lazy cleanup of expired entries without top-level timers.
 * Prevents memory leaks in serverless runtimes.
 */
function cleanupExpiredEntries(now: number): void {
  // Only trigger full prune if store exceeds threshold or randomly on 5% of requests
  if (rateLimitStore.size > MAX_STORE_SIZE || Math.random() < 0.05) {
    for (const [key, entry] of rateLimitStore.entries()) {
      if (now > entry.resetTime) {
        rateLimitStore.delete(key);
      }
    }
  }
}

export interface RateLimitResult {
  success: boolean;
  remaining: number;
  retryAfterSeconds: number;
}

/**
 * Checks whether an identifier (e.g., client IP address, action token) exceeds request limits.
 *
 * @param identifier - Unique string identifying the client / request source
 * @param maxRequests - Maximum allowed requests within the time window (default: 5)
 * @param windowMs - Time window in milliseconds (default: 60,000ms = 1 minute)
 */
export function checkRateLimit(
  identifier: string,
  maxRequests = 5,
  windowMs = 60 * 1000
): RateLimitResult {
  const now = Date.now();
  cleanupExpiredEntries(now);

  const entry = rateLimitStore.get(identifier);

  if (!entry || now > entry.resetTime) {
    rateLimitStore.set(identifier, {
      count: 1,
      resetTime: now + windowMs,
    });
    return {
      success: true,
      remaining: maxRequests - 1,
      retryAfterSeconds: 0,
    };
  }

  if (entry.count >= maxRequests) {
    const retryAfterSeconds = Math.ceil((entry.resetTime - now) / 1000);
    return {
      success: false,
      remaining: 0,
      retryAfterSeconds,
    };
  }

  entry.count += 1;
  return {
    success: true,
    remaining: maxRequests - entry.count,
    retryAfterSeconds: 0,
  };
}
