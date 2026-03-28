import { DateTime } from "luxon";

/**
 * Replace `{{key}}` placeholders in a template string with values from a data object.
 */
export function parseTemplate(template: string | undefined, data: Record<string, string | number | undefined>): string {
  let result = (template ?? "").toString();
  for (const [key, value] of Object.entries(data)) {
    result = result.replace(`{{${key}}}`, value != null ? String(value) : "");
  }
  return result;
}

/**
 * Format a date string for display. Format: "MMM dd, yyyy"
 */
export function displayDate(date?: string, format = "MMM dd, yyyy"): string {
  if (!date) return "";
  return DateTime.fromISO(new Date(date).toISOString()).toFormat(format).toString();
}

/**
 * Convert a string to a URL-safe slug.
 */
export function generateSlug(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Compute pagination metadata for a list of items.
 */
export function computePagination(
  count: number = 1,
  page: number = 1,
  baseHref: string = "",
  template: string = "{{baseHref}}/page/{{id}}",
  perPage: number = 9,
) {
  page = parseInt(String(page || 1)) || 1;
  if (!(page && typeof page === "number" && page >= 1)) return false;

  const totalPages = Math.ceil(count / perPage);
  const start = page <= 1 ? 0 : (page - 1) * perPage;
  const end = start + perPage;

  return {
    count,
    page,
    perPage,
    totalPages,
    baseHref,
    template,
    start,
    end,
  };
}
