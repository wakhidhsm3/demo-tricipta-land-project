/**
 * Centralized error reporting utility.
 * Provides a single integration point for monitoring services (e.g., Sentry, Datadog).
 */
export interface ReportErrorOptions {
  context?: Record<string, unknown>;
  level?: 'error' | 'warning' | 'info';
}

export function reportError(
  error: Error & { digest?: string },
  options: ReportErrorOptions = {}
): void {
  if (process.env.NODE_ENV !== 'production') {
    console.error('[ErrorReporting]', error.message, {
      digest: error.digest,
      stack: error.stack,
      ...options.context,
    });
    return;
  }

  // Production error logging hook (e.g., Sentry.captureException(error))
  console.error('[ErrorReporting:Production]', error.name, error.digest || error.message);
}
