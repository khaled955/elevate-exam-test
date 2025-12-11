import { UpdateInfoResponse } from "@/lib/types/update-profile";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateProfileAction } from "../_action/update-profile.action";
import { UpdateProfileFormValues } from "@/lib/schemes/update-profile.schema";

export function useUpdateProfile() {
  // TanStackQuery=>Mutation
  const { error, isPending, mutateAsync } = useMutation<
    UpdateInfoResponse | undefined,
    Error,
    UpdateProfileFormValues
  >({
    mutationFn: async (formValues) => {
      const toastId = toast.loading("Waiting...");
      const resp = await updateProfileAction(formValues);
      toast.dismiss(toastId);
      return resp;
    },
  });

  return { error, isPending, mutateAsync };
}
