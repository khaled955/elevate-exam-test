import { JSON_HEADER } from "@/lib/constants/api.constant";
import { LOGIN_PATH } from "@/lib/services/auth-api/auth.api";
import { LoginFormValues } from "@/lib/types/authentication";

export async function loginService(loginValues: LoginFormValues) {
  const res = await fetch(`${process.env.BASE_URL}${LOGIN_PATH}`, {
    method: "POST",
    body: JSON.stringify(loginValues),
    headers: { ...JSON_HEADER },
  });

  const payload = await res.json();

  return payload;
}
