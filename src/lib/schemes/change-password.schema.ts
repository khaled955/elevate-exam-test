import z from "zod";
import { PASSWORD_PATTERN } from "../constants/authentication-pattern.constant";
import { CONFIRM_PASSWORD_MESSAGES, OLD_PASSWORD_MESSAGES, PASSWORD_MESSAGES } from "../constants/validation.-message.constant";
export const changePassworSchema = z
  .object({
    oldPassword: z.string().nonempty(OLD_PASSWORD_MESSAGES.REQUIRED),
    password: z
      .string()
      .nonempty(PASSWORD_MESSAGES.REQUIRED)
      .regex(
        PASSWORD_PATTERN,PASSWORD_MESSAGES.PATTERN
      ),
    rePassword: z.string().nonempty(CONFIRM_PASSWORD_MESSAGES.REQUIRED),
  })
  .refine((values) => values.password === values.rePassword, {
    message: CONFIRM_PASSWORD_MESSAGES.IDENTICAL,
    path: ["rePassword"],
  });
