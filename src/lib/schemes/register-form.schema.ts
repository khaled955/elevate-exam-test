import { z } from "zod";

import { normalizeEgyptianPhone } from "../utils/egypt-phone-number";
import {
  FIRST_LAST_NAME_PATTERN,
  PASSWORD_PATTERN,
  PHONE_PATTERN,
} from "../constants/authentication-pattern.constant";
import { CONFIRM_PASSWORD_MESSAGES, EMAIL_MESSAGES, FIRST_LAST_MESSAGES, PASSWORD_MESSAGES, PHONE_MESSAGE, USER_NAME_MESSAGES } from "../constants/validation.-message.constant";

export const registerSchema = z
  .object({
    username: z
      .string()
      .nonempty(USER_NAME_MESSAGES.REQUIRED)
      .min(3, USER_NAME_MESSAGES.PATTERN),
    firstName: z
      .string()
      .nonempty(FIRST_LAST_MESSAGES.REQUIRED("First Name"))
      .min(3, FIRST_LAST_MESSAGES.MIN_LENGTH("First Name"))
      .regex(FIRST_LAST_NAME_PATTERN,FIRST_LAST_MESSAGES.PATTERN("First Name")),
    lastName: z
      .string()
      .nonempty(FIRST_LAST_MESSAGES.REQUIRED("Last Name"))
      .min(3, FIRST_LAST_MESSAGES.MIN_LENGTH("Last Name"))
      .regex(FIRST_LAST_NAME_PATTERN,FIRST_LAST_MESSAGES.PATTERN("Last Name")),
    email: z.email({
      error: (iss) =>
        !Boolean(iss.input) ? EMAIL_MESSAGES.REQUIRED : EMAIL_MESSAGES.INVALID,
    }),
    password: z
      .string()
      .nonempty(PASSWORD_MESSAGES.REQUIRED)
      .regex(
        PASSWORD_PATTERN,PASSWORD_MESSAGES.PATTERN
      ),
    rePassword: z.string().nonempty(CONFIRM_PASSWORD_MESSAGES.REQUIRED),

    phone: z
      .string()
      .nonempty(PHONE_MESSAGE.REQUIRED)
      .transform((val) => normalizeEgyptianPhone(val))
      .refine((v) => PHONE_PATTERN.test(v), {
        message: PHONE_MESSAGE.PATTERN,
      }),
  })

  .refine((data) => data.rePassword === data.password, {
    message:CONFIRM_PASSWORD_MESSAGES.IDENTICAL,
    path: ["rePassword"],
  });
