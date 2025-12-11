"use server";

import { JSON_HEADER } from "@/lib/constants/api.constant";
import { UpdateProfileFormValues } from "@/lib/schemes/update-profile.schema";
import { UPDATE_PROFILE } from "@/lib/services/update-profile-api/update-profile.api";
import { UpdateInfoResponse } from "@/lib/types/update-profile";
import { getToken } from "@/lib/utils/manage-token";
// =============================================================================================================
// & ==> Variables
const ERROR_MSG = "Error During Update Profile From Server Action";
// =============================================================================================================

export async function updateProfileAction(
  updateformValues: UpdateProfileFormValues
): Promise<UpdateInfoResponse> {
  // Get Token
  const jwt = await getToken();
  const token = jwt?.accessToken;

  if (!token) {
    throw new Error("You Must Login First To Update Your Information");
  }

  const resp = await fetch(`${process.env.BASE_URL}${UPDATE_PROFILE.UPDATE}`, {
    method: "PUT",
    headers: {
      ...JSON_HEADER,
      token,
    },
    body: JSON.stringify(updateformValues),
  });

  if (!resp.ok) {
    const errorResponse = await resp.json();
    throw new Error(errorResponse?.message || ERROR_MSG);
  }
  const payload: UpdateInfoResponse = await resp.json();

  if (payload.message !== "success") {
    throw new Error(payload.message);
  }

  return payload;
}
