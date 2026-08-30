import React from 'react';

/**
 * Safely renders a JSON-LD `<script>` tag by escaping dangerous sequences
 * that could break out of the script context (e.g. `</script>`).
 *
 * Replaces the unsafe `dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}` pattern.
 */
export function SafeJsonLd({ data }: { data: Record<string, unknown> }) {
  // Escape closing script tags and HTML comment sequences in serialized JSON
  // to prevent script injection when data comes from external sources (CMS, API).
  const safeJson = JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026');

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJson }}
    />
  );
}
