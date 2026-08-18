const buckets = new Map<string, { count: number; resetAt: number }>();

const WINDOW_MS = 15 * 60 * 1000;
const MAX = 5;

export function rateLimit(key: string) {
  const now = Date.now();
  const current = buckets.get(key);
  if (!current || now > current.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { ok: true, remaining: MAX - 1 };
  }
  if (current.count >= MAX) {
    return { ok: false, remaining: 0 };
  }
  current.count += 1;
  return { ok: true, remaining: MAX - current.count };
}
