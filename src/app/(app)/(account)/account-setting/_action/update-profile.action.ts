"use server";

import { JSON_HEADER } from "@/lib/constants/api.constant";
import { UpdateProfileFormValues } from "@/lib/schemes/update-profile.schema";
import { UPDATE_PROFILE } from "@/lib/services/update-profile-api/update-profile.api";
import { UpdateInfoResponse } from "@/lib/types/update-profile";
import { getToken } from "@/lib/utils/manage-token";

export async function updateProfileAction(
  updateformValues: UpdateProfileFormValues
): Promise<UpdateInfoResponse> {
  // Get Token
  const jwt = await getToken();
  const token = jwt?.accessToken;

  const resp = await fetch(`${process.env.BASE_URL}${UPDATE_PROFILE.UPDATE}`, {
    method: "PUT",
    headers: {
      ...JSON_HEADER,
      token: token!,
    },
    body: JSON.stringify(updateformValues),
  });

  const payload = await resp.json();

  return payload;
}
