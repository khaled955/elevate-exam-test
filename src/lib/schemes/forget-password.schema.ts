import { z } from "zod";
import { PASSWORD_PATTERN } from "../constants/authentication-pattern.constant";
import { registerSchema } from "./register-form.schema";
import { CONFIRM_PASSWORD_MESSAGES, PASSWORD_MESSAGES, VERIFY_OTP_MESSAGES } from "../constants/validation.-message.constant";

// ===============================================================================================================
//^^==>Create New Password schema

export const createNewPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .nonempty(PASSWORD_MESSAGES.REQUIRED)
      .regex(
        PASSWORD_PATTERN,PASSWORD_MESSAGES.PATTERN
      ),
    rePassword: z.string().nonempty(CONFIRM_PASSWORD_MESSAGES.REQUIRED),
  })
  .refine((data) => data.rePassword === data.newPassword, {
    message: CONFIRM_PASSWORD_MESSAGES.IDENTICAL,
    path: ["rePassword"],
  });

// ==============================================================================================================
//^^==>Forget Password Schema
export const forgetPasswordSchema = registerSchema.pick({
  email: true,
});

// ================================================================================================================
//^^==>verify Otp schema
export const VerifyOtpSchema = z.object({
  resetCode: z.string().min(6, {
    message: VERIFY_OTP_MESSAGES.LENGTH,
  }),
});
