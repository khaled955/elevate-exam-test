import { changePasswordFormValues } from './../../../../../lib/types/authentication.d';
import { ChangePasswordResponse } from "@/lib/types/change-password";
import { useMutation } from "@tanstack/react-query";
import { changePasswordAction } from "../_action/change-password.action";
import toast from 'react-hot-toast';


export function useChangePassword(){

    const {mutateAsync,isPending,error} = useMutation<ChangePasswordResponse,Error,changePasswordFormValues>({
        mutationFn:async(values)=>{
             toast("Waiting....")
          const resp = await changePasswordAction(values)
          
          return resp

        },
        onSuccess: async (data)=>{
           toast.success(data.message || "Password Changed Successfully");
        },
        onError:(error)=>{
              toast.error(error.message || "Change Password UnSuccessfull!")
              location.href="/login-form"
        }
    })


    return {mutateAsync,isPending,error}

}