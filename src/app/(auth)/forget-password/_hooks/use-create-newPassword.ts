import { useMutation } from "@tanstack/react-query";
import { CreateNewPasswordAction } from "../_actions/create-new-password";
import {
  CreateNewPasswordPayload,
  CreateNewPasswordResponse,
} from "@/lib/types/authentication";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

// ============================================================================================================
// &==> Variables
const SUCCESS_MSG = "Reset Your Password Successfully👌";
// =============================================================================================================

export function useCreateNewPassword(handleSetCurrentEmail: () => void) {
  // =============================================================================================================
  //&==> Variables
  const router = useRouter();
  // =================================================================================================================
  //*==> Hooks
  const {
    mutateAsync: onCreateNewPassword,
    error,
    isPending,
  } = useMutation<CreateNewPasswordResponse, Error, CreateNewPasswordPayload>({
    mutationFn: (formValues) => CreateNewPasswordAction(formValues),
    onSuccess: (data) => {
      toast.success(data.message ||SUCCESS_MSG );

      //^Reset Current Email
      handleSetCurrentEmail();

      //&Navigation To Login
      setTimeout(() => {
        router.push("/login-form");
      }, 300);
    },
  });

  //   ===============================================================================================================

  return { onCreateNewPassword, error, isPending };
}
