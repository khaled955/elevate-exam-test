"use server";
import {
  RegisterFormValues,
  RegisterResponse,
} from "@/lib/types/authentication";
import { JSON_HEADER } from "@/lib/constants/api.constant";
import { REGISTER_PATH } from "@/lib/services/auth-api/auth.api";

// ==============================================================================================================

export async function registerService(
  formValues: RegisterFormValues
): Promise<RegisterResponse> {
  const resp = await fetch(`${process.env.BASE_URL}${REGISTER_PATH}`, {
    headers: { ...JSON_HEADER },
    method: "POST",
    body: JSON.stringify(formValues),
  });

  const payload = await resp.json();

  return payload;
}
