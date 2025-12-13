import { changePasswordFormValues } from "./../../../../../lib/types/authentication.d";
import { ChangePasswordResponse } from "@/lib/types/change-password";
import { useMutation } from "@tanstack/react-query";
import { changePasswordAction } from "../_action/change-password.action";
import toast from "react-hot-toast";

// =============================================================================================================
// &==> Variables
const ERROR_MSG = `Error During Change Password From Server Action`;
// =============================================================================================================

export function useChangePassword() {
  const { mutate, isPending, error } = useMutation<
    ChangePasswordResponse,
    Error,
    changePasswordFormValues
  >({
    mutationFn: async (values) => {
      toast("Waiting....");
      const payload = await changePasswordAction(values);
      if (payload.message !== "success") {
        throw new Error(payload.message || ERROR_MSG);
      }
      return payload;
    },
    onSuccess: async (data) => {
      toast.success(data.message || "Password Changed Successfully");
    },
    onError: (error) => {
      toast.error(error.message || ERROR_MSG);
      location.href = "/login-form";
    },
  });

  return { mutate, isPending, error };
}
