import { z } from "zod";
import { PASSWORD_PATTERN } from "../constants/authentication-pattern.constant";
import { registerSchema } from "./register-form.schema";

// create New Password schema

export const createNewPasswordSchema = z
  .object({
    newPassword: z
      .string().nonempty("New Password Required")
      .regex(
        PASSWORD_PATTERN,
        "Password must have at least 8 characters, including uppercase, lowercase, number, and special symbol."
      ),
    rePassword: z.string().nonempty("Confirmed New Password Required"),
  })
  .refine((data) => data.rePassword === data.newPassword, {
    message: "Password And Confirm Password Dont match",
    path: ["rePassword"],
  });

// Forget Password Schema
export const forgetPasswordSchema = registerSchema.pick({
  email:true,
});

// verify Otp schema
export const VerifyOtpSchema = z.object({
  resetCode: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});
