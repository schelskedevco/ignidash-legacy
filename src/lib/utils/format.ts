/**
 * Common formatting utilities
 */

/**
 * Format a number with thousand separators
 * @param value - Number to format
 * @param locale - Locale string (default: en-US)
 * @returns Formatted number string
 */
export function formatNumber(value: number, locale = "en-US"): string {
  return new Intl.NumberFormat(locale).format(value);
}

/**
 * Format a date in a human-readable format
 * @param date - Date to format
 * @param options - Intl.DateTimeFormatOptions
 * @param locale - Locale string (default: en-US)
 * @returns Formatted date string
 */
export function formatDate(
  date: Date,
  options?: Intl.DateTimeFormatOptions,
  locale = "en-US"
): string {
  return new Intl.DateTimeFormat(locale, options).format(date);
}

/**
 * Truncate text with ellipsis
 * @param text - Text to truncate
 * @param maxLength - Maximum length before truncation
 * @param suffix - Suffix to add (default: ...)
 * @returns Truncated text
 */
export function truncateText(
  text: string,
  maxLength: number,
  suffix = "..."
): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - suffix.length) + suffix;
}

/**
 * Convert a string to title case
 * @param str - String to convert
 * @returns Title-cased string
 */
export function toTitleCase(str: string): string {
  return str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
}

/**
 * Convert a string to kebab case
 * @param str - String to convert
 * @returns Kebab-cased string
 */
export function toKebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase();
}
