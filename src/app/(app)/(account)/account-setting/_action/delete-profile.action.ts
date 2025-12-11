"use server";

import { JSON_HEADER } from "@/lib/constants/api.constant";
import { DELETE_PROFILE } from "@/lib/services/delete-profile-api/delete-profile.api";
import { DeleteProfileResponse } from "@/lib/types/delete-profile";
import { getToken } from "@/lib/utils/manage-token";

// ===========================================================================================================
// &==> Variables
const ERROR_MSG = "Error During Send Request To Delete";
// ===========================================================================================================

export async function deleteProfileAction(): Promise<DeleteProfileResponse> {
  // Get Token
  const jwt = await getToken();
  const token = jwt?.accessToken;

  if (!token) {
    throw new Error("You Must Login First");
  }

  const rep = await fetch(`${process.env.BASE_URL}${DELETE_PROFILE.DELETE}`, {
    method: "DELETE",
    headers: {
      ...JSON_HEADER,
      token,
    },
  });

  if (!rep.ok) {
    const errorResponse = await rep.json();
    throw new Error(errorResponse?.message || ERROR_MSG);
  }

  const payload: DeleteProfileResponse = await rep.json();

  if (payload.message !== "success") {
    throw new Error(payload.message || ERROR_MSG);
  }
  return payload;
}
