import {
  RegisterFormValues,
  RegisterResponse,
} from "@/lib/types/authentication";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { registerAction } from "../_actions/register-form.action";

// ==============================================================================================================
// &==> Variables
const SUCCESS_MSG = "Success Register 👌";

// ==============================================================================================================
export function useRegister() {
  // ============================================================================================================
  // &==> Variables
  const router = useRouter();

  // ===========================================================================================================
  // *===> Hooks
  const {
    mutateAsync: onRegister,
    isPending,
    error,
  } = useMutation<RegisterResponse, Error, RegisterFormValues>({
    mutationFn: async (formValues) => await registerAction(formValues),
    onSuccess: (data) => {
      toast.success(data.message || SUCCESS_MSG);
      setTimeout(() => {
        router.push("/login-form");
      }, 600);
    },
  });

  // ==========================================================================================================
  return { onRegister, isPending, error };
}
