/**
 * Generates breadcrumb items from URL path segments.
 *
 * Converts each segment into:
 *  - `href`: combined path up to that segment
 *  - `label`: human-readable formatted label (Title Case)
 *
 * If the label exceeds 25 characters, this function assumes the
 * path contains a dynamic ID and extracts only alphabetic characters
 * before the underscore.
 *
 * @param {string[]} segments - Array of URL path parts (split by "/")
 * @returns {Array<{ href: string; label: string | string[] | null }>}
 *
 * @example
 * generateBreadcrumbs(["dashboard", "users", "12345_item_data"]);
 *
 * @example
 * // Output:
 * [
 *   { href: "/dashboard", label: "Dashboard" },
 *   { href: "/dashboard/users", label: "Users" },
 *   { href: "/dashboard/users/12345_item_data", label: ["item", "data"] }
 * ]
 */
export function generateBreadcrumbs(segments: string[]) {
  return segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/");

    const label = segment
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());

    // Check If Param Has ID (too long → treat as dynamic value)
    if (label.length > 25) {
      return { href, label: label.split("_")[0].match(/[a-zA-Z]/gi) };
    }

    return { href, label };
  });
}
