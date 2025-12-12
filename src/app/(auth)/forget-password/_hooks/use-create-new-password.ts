import { useMutation } from "@tanstack/react-query";
import {
  CreateNewPasswordPayload,
  CreateNewPasswordResponse,
} from "@/lib/types/authentication";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { CreateNewPasswordService } from "../_services/create-new-password.service";

// ============================================================================================================
// &==> Variables
const SUCCESS_MSG = "Reset Your Password Successfully👌";
const CREATE_NEW_PASSWORD_ERROR = `Error During Send New Password To Server!`;
// =============================================================================================================

export function useCreateNewPassword(handleSetCurrentEmail: () => void) {
  // =============================================================================================================
  //&==> Variables
  const router = useRouter();
  // =================================================================================================================
  //*==> Hooks
  const {
    mutate: onCreateNewPassword,
    error,
    isPending,
  } = useMutation<CreateNewPasswordResponse, Error, CreateNewPasswordPayload>({
    mutationFn: async (formValues) => {
      const payload = await CreateNewPasswordService(formValues);

      // !!=>Catch Error
      if ("code" in payload) {
        throw new Error(payload?.message || CREATE_NEW_PASSWORD_ERROR);
      }

      return payload;
    },
    onSuccess: (data) => {
      toast.success(data.message || SUCCESS_MSG);
      //&Navigation To Login
      router.push("/login-form");
      
      //^Reset Current Email
      handleSetCurrentEmail();
    },
  });

  //   ===============================================================================================================

  return { onCreateNewPassword, error, isPending };
}
