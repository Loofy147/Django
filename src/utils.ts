// src/utils.ts

/**
 * Generate a random UUID (v4) string.
 */
export function generateId(): string {
  // simplified random-UUID
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === "x" ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

/**
 * Sleep for ms milliseconds.
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Get current ISO timestamp.
 */
export function nowISO(): string {
  return new Date().toISOString()
}

/**
 * Format business education content for better readability
 */
export function formatBusinessContent(content: string, type: "case-study" | "framework" | "analysis"): string {
  const timestamp = nowISO()
  const header = `=== ${type.toUpperCase()} [${timestamp}] ===\n\n`
  return header + content + "\n\n=== END ==="
}
