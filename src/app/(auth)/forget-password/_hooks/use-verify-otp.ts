import { useMutation } from "@tanstack/react-query";
import {
  VerifyOtpFormValues,
  VerifyOtpResponse,
} from "@/lib/types/authentication";
import { veryifOtpService } from "../_services/verify-otp.service";
// ============================================================================================================
//&==> Variables
const VERIFY_OTP_ERROR = `Error During Send Otp To Server!`;

// ============================================================================================================

export function useVerifyOtp() {
  const {
    mutate: onVerifyOtp,
    error,
    isPending,
  } = useMutation<VerifyOtpResponse, Error, VerifyOtpFormValues>({
    mutationFn: async (formValues) => {
      const payload = await veryifOtpService(formValues);

      // !!=> Catch Error
      if ("code" in payload) {
        throw new Error(payload.message || VERIFY_OTP_ERROR);
      }

      return payload;
    },
  });

  return { onVerifyOtp, error, isPending };
}
