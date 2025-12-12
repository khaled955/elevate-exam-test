"use server";

import { JSON_HEADER } from "@/lib/constants/api.constant";
import { RESET_PASSWORD_PATH } from "@/lib/services/auth-api/auth.api";
import {
  CreateNewPasswordPayload,
  CreateNewPasswordResponse,
} from "@/lib/types/authentication";

export async function CreateNewPasswordService(
  formValues: CreateNewPasswordPayload
): Promise<CreateNewPasswordResponse> {
  const resp = await fetch(`${process.env.BASE_URL}${RESET_PASSWORD_PATH}`, {
    headers: { ...JSON_HEADER },
    method: "PUT",
    body: JSON.stringify(formValues),
  });

  const payload: CreateNewPasswordResponse = await resp.json();

  return payload;
}
