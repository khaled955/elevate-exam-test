"use server";
import {
  RegisterFormValues,
  RegisterResponse,
} from "@/lib/types/authentication";
import { JSON_HEADER } from "@/lib/constants/api.constant";
import { REGISTER_PATH } from "@/lib/services/auth-api/auth.api";

// ==============================================================================================================
//&==>Variables
const REGISTER_ERROR = `Error During Register New User!`;

export async function registerAction(
  formValues: RegisterFormValues
): Promise<RegisterResponse> {
  //??==>Contact Api
  const resp = await fetch(`${process.env.BASE_URL}${REGISTER_PATH}`, {
    headers: { ...JSON_HEADER },
    method: "POST",
    body: JSON.stringify(formValues),
  });

  //!!==>Catch Error
  if (!resp.ok) {
    const errorMessage = await resp.json();
    throw new Error(errorMessage.message || REGISTER_ERROR);
  }

  const payload = await resp.json();

  //!==>Catch Error
  if (payload.message !== "success") {
    throw new Error(payload.message || REGISTER_ERROR);
  }

  return payload;
}
