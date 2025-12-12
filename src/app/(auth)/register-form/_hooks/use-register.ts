import {
  RegisterFormValues,
  RegisterResponse,
} from "@/lib/types/authentication";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { registerService } from "../_services/register.service";

// ==============================================================================================================
// &==> Variables
const SUCCESS_MSG = "Success Register 👌";
const ERROR_MSG = `Error During Register Email`
// ==============================================================================================================
export function useRegister() {
  // ============================================================================================================
  // &==> Variables
  const router = useRouter();

  // ===========================================================================================================
  // *===> Hooks
  const {
    mutate: onRegister,
    isPending,
    error,
  } = useMutation<RegisterResponse, Error, RegisterFormValues>({
    mutationFn: async (formValues) => {
      const payload = await registerService(formValues);

      // !!==> Catch Error
      if ("code" in payload) {
        throw new Error(payload.message || ERROR_MSG);
      }

      return payload;
    },
    onSuccess: (data) => {
      toast.success(data.message || SUCCESS_MSG);
      setTimeout(() => {
        router.push("/login-form");
      }, 300);
    },
  });

  // ==========================================================================================================
  return { onRegister, isPending, error };
}
