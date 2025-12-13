"use server";

import { JSON_HEADER } from "@/lib/constants/api.constant";
import { DELETE_PROFILE } from "@/lib/services/delete-profile-api/delete-profile.api";
import { DeleteProfileResponse } from "@/lib/types/delete-profile";
import { getToken } from "@/lib/utils/manage-token";

export async function deleteProfileAction(): Promise<DeleteProfileResponse> {
  // Get Token
  const jwt = await getToken();
  const token = jwt?.accessToken;

  const rep = await fetch(`${process.env.BASE_URL}${DELETE_PROFILE.DELETE}`, {
    method: "DELETE",
    headers: {
      ...JSON_HEADER,
      token: token!,
    },
  });

  const payload = await rep.json();

  return payload;
}
