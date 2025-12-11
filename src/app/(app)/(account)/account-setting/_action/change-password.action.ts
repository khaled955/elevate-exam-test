"use server";

import { JSON_HEADER } from "@/lib/constants/api.constant";
import { CHANGE_PASSWORD } from "@/lib/services/change-password-api/change-password.api";
import { changePasswordFormValues } from "@/lib/types/authentication";
import { ChangePasswordResponse } from "@/lib/types/change-password";
import { getToken, setToken } from "@/lib/utils/manage-token";
import type { JWT } from "next-auth/jwt";
// =============================================================================================================
// &==> Variables
const ERROR_MSG = `Error During Change Password From Server Action`;
// =============================================================================================================

export async function changePasswordAction(
  values: changePasswordFormValues
): Promise<ChangePasswordResponse> {
  // Get Token
  const jwt = await getToken();
  const token = jwt?.accessToken;

  if (!token) {
    throw new Error("You Must Login First");
  }

  const resp = await fetch(`${process.env.BASE_URL}${CHANGE_PASSWORD.CHANGE}`, {
    method: "PATCH",
    headers: {
      ...JSON_HEADER,
      token,
    },
    body: JSON.stringify(values),
  });

  if (!resp.ok) {
    const errorResponse = await resp.json();
    throw new Error(errorResponse?.message || ERROR_MSG);
  }

  const payload: ChangePasswordResponse = await resp.json();

  if (payload.message !== "success") {
    throw new Error(payload.message || ERROR_MSG);
  }

  // Set New Token
  if (payload.token && jwt) {
    const newJwt: JWT = {
      ...jwt,
      accessToken: payload.token,
    };

    await setToken(newJwt);
  }

  return payload;
}
