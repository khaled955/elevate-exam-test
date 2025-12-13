import { UpdateInfoResponse } from "@/lib/types/update-profile";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateProfileAction } from "../_action/update-profile.action";
import { UpdateProfileFormValues } from "@/lib/schemes/update-profile.schema";
import { AuthUser } from "@/lib/types/authentication";
import { useSession } from "next-auth/react";

// =============================================================================================================
// & ==> Variables
const ERROR_MSG = "Error During Update Profile From Server Action";
// =============================================================================================================

export function useUpdateProfile() {
  // ^^==> States
  const { data: session, status, update } = useSession();

  // =================================================================================================================
  //&&==> Variables
  const currentUser = session?.user as AuthUser | undefined;
  // ==================================================================================================================

  // TanStackQuery=>Mutation
  const { error, isPending, mutate } = useMutation<
    UpdateInfoResponse | undefined,
    Error,
    UpdateProfileFormValues
  >({
    mutationFn: async (formValues) => {
      const toastId = toast.loading("Waiting...");
      const payload = await updateProfileAction(formValues);
      toast.dismiss(toastId);
      if (payload.message !== "success") {
        throw new Error(payload.message || ERROR_MSG);
      }
      return payload;
    },
    onSuccess: async (data) => {
      if (!data) return;
      toast.success(data.message);

      await update({
        user: {
          ...(currentUser ?? {}),
          email: data.user.email,
          firstName: data.user.firstName,
          lastName: data.user.lastName,
          username: data.user.username,
          phone: `+20${data.user.phone}`,
        },
      });
    },
    onError: (error) => {
      toast.error(error.message || ERROR_MSG);
    },
  });

  return { error, isPending, mutate, status, currentUser };
}
