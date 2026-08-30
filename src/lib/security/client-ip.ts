import { headers } from 'next/headers';

/**
 * Extracts client IP address safely from Next.js server headers.
 * Inspects standard proxy headers (x-forwarded-for, x-real-ip, cf-connecting-ip).
 */
export async function getClientIp(): Promise<string> {
  try {
    const headersList = await headers();
    // 1. Check direct edge platform headers (cannot be client-spoofed)
    const cfIp = headersList.get('cf-connecting-ip');
    if (cfIp?.trim() && isValidIp(cfIp.trim())) return cfIp.trim();

    const vercelIp = headersList.get('x-vercel-forwarded-for');
    if (vercelIp?.trim()) {
      const parsed = vercelIp.split(',')[0]?.trim();
      if (parsed && isValidIp(parsed)) return parsed;
    }

    const realIp = headersList.get('x-real-ip');
    if (realIp?.trim() && isValidIp(realIp.trim())) return realIp.trim();

    // 2. Fallback to standard x-forwarded-for
    const forwardedFor = headersList.get('x-forwarded-for');
    if (forwardedFor) {
      const parts = forwardedFor.split(',').map((ip) => ip.trim()).filter(Boolean);
      // In trusted reverse proxies, the first or last verified IP is standard
      const clientCandidate = parts[0];
      if (clientCandidate && isValidIp(clientCandidate)) return clientCandidate;
    }

    return '127.0.0.1';
  } catch {
    return '127.0.0.1';
  }
}

/** Basic IPv4 / IPv6 format sanity check */
function isValidIp(ip: string): boolean {
  // IPv4 simple regex or IPv6 hex format check
  const ipv4Regex = /^(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)$/;
  const ipv6Regex = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$|^::1$/;
  return ipv4Regex.test(ip) || ipv6Regex.test(ip) || ip.includes(':');
}
