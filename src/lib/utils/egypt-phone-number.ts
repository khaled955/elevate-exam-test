 export const normalizeEgyptianPhone = (raw: string): string => {
  if (!raw) return "";

  // Remove all non-digits (spaces, +, -)
  const digits = raw.replace(/\D/g, ""); // "+20 010 5678903" => "200105678903"

  // If starts with 20 (country code)
  if (digits.startsWith("20")) {
    const rest = digits.slice(2); // remove "20"

    // rest = "0105678903" OR "105678903"
    if (rest.startsWith("01")) {
      return rest;               // "0105678903"
    }
    if (rest.startsWith("1")) {
      return "0" + rest;         // "105678903" => "0105678903"
    }
  }

  // Local Egyptian
  if (digits.startsWith("01")) {
    return digits;               // "0105678903"
  }

  // Missing leading zero
  if (digits.startsWith("1")) {
    return "0" + digits;         // "105678903" => "0105678903"
  }

  // default (invalid case)
  return digits;
};