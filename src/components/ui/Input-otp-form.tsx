"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Loader, MoveRight } from "lucide-react";
import { VerifyOtpFormValues } from "@/lib/types/authentication";
import SubmitionError from "../shared/submition-error";
import { useVerifyOtp } from "@/app/(auth)/forget-password/_hooks/use-verify-otp";
import toast from "react-hot-toast";
import { useForgetPassword } from "@/app/(auth)/forget-password/_hooks/use-forget-password";
import { VerifyOtpSchema } from "@/lib/schemes/forget-password.schema";

// =============================================================================================================
//*==>Types
type InputOtpFormProps = {
  onSuccess: () => void;
  currentEmail: string | null;
  secondLeft: number;
  setSeconds: (val: number) => void;
};
// =============================================================================================================
//&==>Variables
const defaultValues = {
  resetCode: "",
};
const SUCCESS_MSG = "Otp Has Sent To Your Email";
// ==============================================================================================================

export function InputOTPForm({
  onSuccess,
  currentEmail,
  secondLeft,
  setSeconds,
}: InputOtpFormProps) {
  // =======================================================================================================
  //*==>Hooks=============> Mutate(Verify)
  const { error, isPending, onVerifyOtp } = useVerifyOtp();
  const {
    onForget,
    error: forgetError,
    isPending: forgetIsPending,
  } = useForgetPassword();
  // ===========================================================================================================
  //?==> React Hook Form(RHF)
  const form = useForm<VerifyOtpFormValues>({
    resolver: zodResolver(VerifyOtpSchema),
    defaultValues,
  });

  const {
    formState: { isSubmitting },
  } = form;
  // =============================================================================================================
  //??==>Handlers
  const handleVerifyOtp: SubmitHandler<VerifyOtpFormValues> = async (
    formValues
  ) => {
    await onVerifyOtp(formValues, {
      onSuccess: (data) => {
        toast.success(data.message || "Successfully");
        //*==>Show New Password Form
        onSuccess();
      },
    });
  };

  // &==> Resend Otp
  async function handleResendOtp() {
    if (!currentEmail) return;
    await onForget(
      { email: currentEmail },
      {
        onSuccess: (data) => {
          setSeconds(60);
          toast.success(data.message || SUCCESS_MSG);
        },
      }
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleVerifyOtp)}
        className="w-full space-y-6"
      >
        <FormField
          control={form.control}
          name="resetCode"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              {/*//!==>Feedback */}
              <FormDescription>
                Please enter the one-time password sent to your phone.
              </FormDescription>

              <FormMessage />
            </FormItem>
          )}
        />

        {/*//!==>Server error After Submit */}
        {error && <SubmitionError Msg={error?.message} />}

        {forgetError && <SubmitionError Msg={forgetError?.message} />}

        {/*//*==>Submit Btn */}
        <Button
          className="w-full"
          disabled={isSubmitting || isPending}
          type="submit"
        >
          {isPending || isSubmitting || forgetIsPending ? (
            <Loader className="animate-spin" />
          ) : (
            "Verify Code"
          )}
          {!isPending && <MoveRight />}
        </Button>
      </form>
      <div className="action-btn">
        {secondLeft !== 0 && (
          <p className="mt-5 text-gray-500 text-sm">
            You can request another code in:
            {secondLeft < 10 ? `0${secondLeft}` : secondLeft}s
          </p>
        )}

        {secondLeft === 0 && (
          <p className="mt-5 text-gray-500 text-sm">
            Didn’t receive the code?
            {/* //?==> Resend Btn */}
            <button className="text-blue-600 ml-1" onClick={handleResendOtp}>
              Resend
            </button>
          </p>
        )}
      </div>
    </Form>
  );
}
