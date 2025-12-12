import z from "zod";
import { PASSWORD_PATTERN } from "../constants/authentication-pattern.constant";
export const changePassworSchema = z
  .object({
    oldPassword: z.string().nonempty("Old Password Is Required"),
    password: z
      .string()
      .nonempty("Password Is Required")
      .regex(
        PASSWORD_PATTERN,
        "Password must have at least 8 characters, including uppercase, lowercase, number, and special symbol."
      ),
    rePassword: z.string().nonempty("Confirmed Password Is Required"),
  })
  .refine((values) => values.password === values.rePassword, {
    message: "New Password And Confirmed Password Not Identical",
    path: ["rePassword"],
  });
