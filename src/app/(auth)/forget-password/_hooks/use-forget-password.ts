import {
  ForgetFormValues,
  ForgetPasswordResponse,
} from "@/lib/types/authentication";
import { useMutation } from "@tanstack/react-query";
import { sendEmailToServerAction } from "../_actions/forget-password.action";

export function useForgetPassword() {
  const {
    mutateAsync: onForget,
    isPending,
    error,
  } = useMutation<ForgetPasswordResponse, Error, ForgetFormValues>({
    mutationFn: (formValues) => sendEmailToServerAction(formValues),
  });

  return { onForget, isPending, error };
}
