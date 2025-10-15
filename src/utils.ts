// src/utils.ts

/**
 * Generates a random UUID (v4) string.
 * @returns A random UUID string.
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
 * Pauses execution for a specified number of milliseconds.
 * @param ms - The number of milliseconds to sleep.
 * @returns A promise that resolves after the specified time.
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Gets the current ISO timestamp.
 * @returns The current ISO timestamp string.
 */
export function nowISO(): string {
  return new Date().toISOString()
}

/**
 * Formats business education content for better readability.
 * @param content - The content to format.
 * @param type - The type of the content.
 * @returns The formatted content.
 */
export function formatBusinessContent(content: string, type: "case-study" | "framework" | "analysis"): string {
  const timestamp = nowISO()
  const header = `=== ${type.toUpperCase()} [${timestamp}] ===\n\n`
  return header + content + "\n\n=== END ==="
}
