"use server";

import { JSON_HEADER } from "@/lib/constants/api.constant";
import { VERIFY_PASSWORD_PATH } from "@/lib/services/auth-api/auth.api";
import {
  VerifyOtpFormValues,
  VerifyOtpResponse,
} from "@/lib/types/authentication";

export async function veryifOtpService(
  formValues: VerifyOtpFormValues
): Promise<VerifyOtpResponse> {
  const resp = await fetch(`${process.env.BASE_URL}${VERIFY_PASSWORD_PATH}`, {
    headers: { ...JSON_HEADER },
    method: "POST",
    body: JSON.stringify(formValues),
  });

  const payload = await resp.json();

  return payload;
}
