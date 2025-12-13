import { DeleteProfileResponse } from "@/lib/types/delete-profile";
import { useMutation } from "@tanstack/react-query";
import { deleteProfileAction } from "../_action/delete-profile.action";
import toast from "react-hot-toast";
import { signOut } from "next-auth/react";


// ===========================================================================================================
// &==> Variables
const ERROR_MSG = "Error During Send Request To Delete";
// ===========================================================================================================

export function useDeleteProfile() {
  const { mutate, isPending, error } = useMutation<
    DeleteProfileResponse,
    Error
  >({
    mutationFn: async () => {
       toast("Waiting...");
      const payload = await deleteProfileAction();
      if(payload.message !== "success"){
        throw new Error(payload.message || ERROR_MSG)
      }
     
      return payload;
    },
    onSuccess: async (data) => {
      toast.success(data.message);
      await signOut();
    },
    onError: (error) => {
      toast.error(error.message || ERROR_MSG);
    },
  });

  return { mutate, isPending, error };
}
