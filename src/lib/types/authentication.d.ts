import { z } from "zod";
import { registerSchema } from "../schemes/register-schema";
import { loginSchema } from "../schemes/login-schema";
import {
  createNewPasswordSchema,
  forgetPasswordSchema,
  VerifyOtpSchema,
} from "../schemes/forget-schema";
import { changePassworSchema } from "../schemes/change-password-schema";

// =============================================================================================================
//^^==>User Info
export type AuthUser = {
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: "user" | "admin";
  isVerified: boolean;
  createdAt: string; // ISO date
};
// =============================================================================================================
// ^^==>Authentication type for all Auth Module
export type AuthState = {
  ok: boolean;
  message?: string | undefined;
  fieldErrors?: Record<string, string[]> | undefined;
};

// =================================================================================================================
//^^==>Register
export type RegisterFormValues = z.infer<typeof registerSchema>;
export type RegisterResponse = {
  message: string;
  token: string;
  user: AuthUser;
};

// ================================================================================================================
// ^^==>login
export type LoginFormValues = z.infer<typeof loginSchema>;
export type LoginResponse = {
  token: string;
  user: AuthUser;
};

// ================================================================================================================
//^^==>Forget Password
export type ForgetFormValues = z.infer<typeof forgetPasswordSchema>;
export type ForgetPasswordResponse = {
  message: string;
  info: string;
};

// ==============================================================================================================
//^^==>Verify Otp
export type VerifyOtpFormValues = z.infer<typeof VerifyOtpSchema>;
export type VerifyOtpResponse = {
  status?: "Success";
  message?: string;
};

// ===============================================================================================================
//^^==>Create New Password
export type CreateNewPasswordFormValues = z.infer<
  typeof createNewPasswordSchema
>;
export type CreateNewPasswordPayload = Omit<
  CreateNewPasswordFormValues,
  "rePassword"
> & {
  email: string;
};
export type CreateNewPasswordResponse = {
  message: "success";
  token: string;
};

// ===============================================================================================================
//^^==>Change Password
export type changePasswordFormValues = z.infer<typeof changePassworSchema>;
