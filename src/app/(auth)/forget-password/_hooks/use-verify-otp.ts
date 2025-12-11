import { useMutation } from "@tanstack/react-query";
import { veryifOtpAction } from "../_actions/verify-otp.action";
import { VerifyOtpFormValues, VerifyOtpResponse } from "@/lib/types/authentication";

export function useVerifyOtp(){

    const {mutateAsync:onVerifyOtp,error,isPending} = useMutation<VerifyOtpResponse,Error,VerifyOtpFormValues>({
        mutationFn: async (formValues)=> await veryifOtpAction(formValues)
    })


    return {onVerifyOtp,error,isPending}
}