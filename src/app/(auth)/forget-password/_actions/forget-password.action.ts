"use server";

import { JSON_HEADER } from "@/lib/constants/api.constant";
import { FORGET_PASSWORD_PATH } from "@/lib/services/auth-api/auth.api";
import {
  ForgetFormValues,
  ForgetPasswordResponse,
} from "@/lib/types/authentication";

// ==============================================================================================================
//&==> Variables
const SEND_EMAIL_ERROR = "Error During Send Enail To Server!";
// ==============================================================================================================

export async function sendEmailToServerAction(
  formValues: ForgetFormValues
): Promise<ForgetPasswordResponse> {
  //?==>Contact Api
  const resp = await fetch(`${process.env.BASE_URL}${FORGET_PASSWORD_PATH}`, {
    headers: { ...JSON_HEADER },
    method: "POST",
    body: JSON.stringify(formValues),
  });

  //!==>Catch Error
  if (!resp.ok) {
    const errorResponse = await resp.json();
    throw new Error(errorResponse?.message || SEND_EMAIL_ERROR);
  }

  const payload = await resp.json();

  //!==>Catch Error
  if (payload.message !== "success") {
    throw new Error(payload.message || SEND_EMAIL_ERROR);
  }

  return payload;
}
