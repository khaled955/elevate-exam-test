import {
  ForgetFormValues,
  ForgetPasswordResponse,
} from "@/lib/types/authentication";
import { useMutation } from "@tanstack/react-query";
import { forgetPasswordService } from "../_services/forget-password.service";

// ============================================================================================================
// &=> Variables
const ERROR_MSG = `Error During Send Email`;
// =============================================================================================================
export function useForgetPassword() {
  const {
    mutate: onForget,
    isPending,
    error,
  } = useMutation<ForgetPasswordResponse, Error, ForgetFormValues>({
    mutationFn: async (formValues) => {
      const payload = await forgetPasswordService(formValues);

      // !!=> Catch Error
      if ("code" in payload) {
        throw new Error(payload.message || ERROR_MSG);
      }

      return payload;
    },
  });

  return { onForget, isPending, error };
}
