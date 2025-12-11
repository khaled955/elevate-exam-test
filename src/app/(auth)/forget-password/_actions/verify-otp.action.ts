"use server";

import { JSON_HEADER } from "@/lib/constants/api.constant";
import { VERIFY_PASSWORD_PATH } from "@/lib/services/auth-api/auth.api";
import {
  VerifyOtpFormValues,
  VerifyOtpResponse,
} from "@/lib/types/authentication";

// ============================================================================================================
//&==> Variables
const VERIFY_OTP_ERROR = `Error During Send Otp To Server!`;

// =================================================================================================================
export async function veryifOtpAction(
  formValues: VerifyOtpFormValues
): Promise<VerifyOtpResponse> {
  //   Contact Api
  const resp = await fetch(`${process.env.BASE_URL}${VERIFY_PASSWORD_PATH}`, {
    headers: { ...JSON_HEADER },
    method: "POST",
    body: JSON.stringify(formValues),
  });

  // Catch Error
  if (!resp.ok) {
    const errorResponse = await resp.json();
    throw new Error(errorResponse?.message || VERIFY_OTP_ERROR);
  }

  const payload = await resp.json();

  //  Catch Error
  if (payload.message) {
    throw new Error(payload.message || VERIFY_OTP_ERROR);
  }

  return payload;
}
