//**************************************************JSDoc********************************************************** */
/**
 * Normalizes an Egyptian phone number into a standard local format.
 *
 * This function:
 * - Removes all non-digit characters (spaces, "+", "-", etc.).
 * - Handles Egyptian country code (`20`) if present.
 * - Ensures the phone number starts with `01` (local mobile format).
 *
 * @param raw - The raw phone number input (e.g. "+20 10 5678 903", "105678903").
 * @returns A normalized Egyptian phone number in local format (e.g. "0105678903"),
 *          or an empty string if the input is empty.
 *
 * @example
 * normalizeEgyptianPhone("+20 10 5678 903"); // "0105678903"
 * normalizeEgyptianPhone("105678903");       // "0105678903"
 * normalizeEgyptianPhone("0105678903");      // "0105678903"
 */

//*************************************************************************************************************** */

export const normalizeEgyptianPhone = (raw: string): string => {
  if (!raw) return "";

  // Remove all non-digits (spaces, +, -)
  const digits = raw.replace(/\D/g, ""); // "+20 010 5678903" => "200105678903"

  // If starts with 20 (country code)
  if (digits.startsWith("20")) {
    const rest = digits.slice(2); // remove "20"

    // rest = "0105678903" OR "105678903"
    if (rest.startsWith("01")) {
      return rest; // "0105678903"
    }
    if (rest.startsWith("1")) {
      return "0" + rest; // "105678903" => "0105678903"
    }
  }

  // Local Egyptian
  if (digits.startsWith("01")) {
    return digits; // "0105678903"
  }

  // Missing leading zero
  if (digits.startsWith("1")) {
    return "0" + digits; // "105678903" => "0105678903"
  }

  // default (invalid case)
  return digits;
};
