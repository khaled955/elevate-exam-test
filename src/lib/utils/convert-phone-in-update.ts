export const toE164EG = (phone?: string | null) => {
  if (!phone) return "";

  // Remove any space
  const digits = phone.replace(/\D/g, "");

  if (phone.startsWith("+")) return phone;

  if (digits.length === 11 && digits.startsWith("01")) {
    return `+20${digits.slice(1)}`; // 01123456789 -> +201123456789
  }

  return `+${digits}`;
};
