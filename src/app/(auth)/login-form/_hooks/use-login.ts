import { LoginFormValues } from "@/lib/types/authentication";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";

// ==============================================================================================================
//&==>Variables
const LOGIN_ERROR = `Error During Login`;
const PATTERN_ERROR_END = `.{8,}$/`;

// ==============================================================================================================
export function useLogin() {
  const { mutate, error, isPending } = useMutation({
    mutationFn: async (loginValues: LoginFormValues) => {
      const resp = await signIn("credentials", {
        email: loginValues.email,
        password: loginValues.password,
        redirect: false,
      });

      if (!resp?.ok) {
        throw new Error(resp?.error || LOGIN_ERROR);
      }

      return resp;
    },
    onSuccess: () => {
      //*==>Programmatic Navigation
      const callbackUrl =
        new URLSearchParams(location.search).get("callbackUrl") || "/";
      window.location.href = callbackUrl;
    },
    onError: (error) => {
      // ^^=> Handle Pattern Error Msg For Password
      if (error.message.endsWith(PATTERN_ERROR_END))
        return (error.message = `incorrect email or password`);
    },
  });

  return { mutate, error, isPending };
}
