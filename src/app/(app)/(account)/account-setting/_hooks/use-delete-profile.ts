import { DeleteProfileResponse } from "@/lib/types/delete-profile";
import { useMutation } from "@tanstack/react-query";
import { deleteProfileAction } from "../_action/delete-profile.action";
import toast from "react-hot-toast";
import { signOut } from "next-auth/react";

export function useDeleteProfile() {
  const { mutate, isPending, error } = useMutation<
    DeleteProfileResponse,
    Error
  >({
    mutationFn: async () => {
      const toastId = toast.loading("Waiting");
      const resp = await deleteProfileAction();
      setTimeout(() => {
        toast.dismiss(toastId);
      }, 1000);
      return resp;
    },
    onSuccess: async (data) => {
      toast.success(data.message);
      await signOut();
    },
    onError: (error) => {
      toast.error(error.message || "Failed To Delete Account!");
    },
  });

  return { mutate, isPending, error };
}
