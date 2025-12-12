"use server";

import { JSON_HEADER } from "@/lib/constants/api.constant";
import { FORGET_PASSWORD_PATH } from "@/lib/services/auth-api/auth.api";
import {
  ForgetFormValues,
  ForgetPasswordResponse,
} from "@/lib/types/authentication";

export async function forgetPasswordService(
  formValues: ForgetFormValues
): Promise<ForgetPasswordResponse> {
  const resp = await fetch(`${process.env.BASE_URL}${FORGET_PASSWORD_PATH}`, {
    headers: { ...JSON_HEADER },
    method: "POST",
    body: JSON.stringify(formValues),
  });

  const payload = await resp.json();

  return payload;
}
