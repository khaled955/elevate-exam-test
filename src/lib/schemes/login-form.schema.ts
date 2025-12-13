import z from "zod";
import {
  EMAIL_MESSAGES,
  PASSWORD_MESSAGES,
} from "../constants/validation.-message.constant";

export const loginSchema = z.object({
  email: z.email({
    error: (iss) =>
      !Boolean(iss.input) ? EMAIL_MESSAGES.REQUIRED : EMAIL_MESSAGES.INVALID,
  }),
  password: z.string().nonempty(PASSWORD_MESSAGES.REQUIRED),
});
