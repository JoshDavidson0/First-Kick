// Simple in-memory rate limiter for Next.js route handlers
// Resets on server restart — sufficient for abuse prevention at this scale

interface RateLimitEntry {
  count: number
  resetAt: number
}

const store = new Map<string, RateLimitEntry>()

const WINDOW_MS = 60 * 1000  // 1 minute window
const MAX_REQUESTS = 10       // max requests per IP per window

/**
 * Basic in-memory rate limiter.
 * Note: This resets on every Amplify deployment and every cold start.
 * This is acceptable for simple abuse prevention without persistent infrastructure.
 */
export function rateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now()
  const entry = store.get(ip)

  if (!entry || now > entry.resetAt) {
    store.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    return { allowed: true, remaining: MAX_REQUESTS - 1 }
  }

  if (entry.count >= MAX_REQUESTS) {
    return { allowed: false, remaining: 0 }
  }

  entry.count++
  return { allowed: true, remaining: MAX_REQUESTS - entry.count }
}
