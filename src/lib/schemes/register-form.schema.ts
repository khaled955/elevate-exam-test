import { z } from "zod";

import { normalizeEgyptianPhone } from "../utils/egypt-phone-number";
import {
  FIRST_LAST_NAME_PATTERN,
  PASSWORD_PATTERN,
  PHONE_PATTERN,
} from "../constants/authentication-pattern.constant";

export const registerSchema = z
  .object({
    username: z.string().min(3, "user-name At least 3 Characters"),
    firstName: z
      .string()
      .min(3, "first name at least 3 characters")
      .regex(FIRST_LAST_NAME_PATTERN, "first name must only letters"),
    lastName: z
      .string()
      .min(3, "last name at least 3 characters")
      .regex(FIRST_LAST_NAME_PATTERN, "last name must only letters"),
    email: z.email({
      error: (iss) =>
        !Boolean(iss.input) ? "Email Is Required" : "Invalid Email",
    }),
    password: z
      .string()
      .regex(
        PASSWORD_PATTERN,
        "Password must have at least 8 characters, including uppercase, lowercase, number, and special symbol."
      ),
    rePassword: z.string().nonempty("Confirm Password Is Required"),

    phone: z
      .string()
      .min(1, "Phone is required")
      .transform((val) => normalizeEgyptianPhone(val))
      .refine((v) => PHONE_PATTERN.test(v), {
        message: "Egyptian Number Only Accepted",
      }),
  })

  .refine((data) => data.rePassword === data.password, {
    message: "Password And Confirm Password Dont match",
    path: ["rePassword"],
  });
