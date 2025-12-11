"use server";

import { JSON_HEADER } from "@/lib/constants/api.constant";
import { RESET_PASSWORD_PATH } from "@/lib/services/auth-api/auth.api";
import {
  CreateNewPasswordPayload,
  CreateNewPasswordResponse,
} from "@/lib/types/authentication";

// =================================================================================================================
//&==>Variables
const CREATE_NEW_PASSWORD_ERROR = `Error During Send New Password To Server!`;
// =================================================================================================================

export async function CreateNewPasswordAction(
  formValues: CreateNewPasswordPayload
): Promise<CreateNewPasswordResponse> {
  //?==>Contact Api
  const resp = await fetch(`${process.env.BASE_URL}${RESET_PASSWORD_PATH}`, {
    headers: { ...JSON_HEADER },
    method: "PUT",
    body: JSON.stringify(formValues),
  });

  //!==>Catch Error
  if (!resp.ok) {
    const errorResponse = await resp.json();
    throw new Error(errorResponse?.message || CREATE_NEW_PASSWORD_ERROR);
  }

  const payload: CreateNewPasswordResponse = await resp.json();

  //!==>Catch Error
  if (payload.message !== "success") {
    throw new Error(payload.message);
  }

  return payload;
}
