
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
