"use client";
import SubmitionError from "@/components/shared/submition-error";
import TypingAuthError from "@/components/shared/typing-auth-error";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ForgetFormValues } from "@/lib/types/authentication";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Loader, MoveRight } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import { useForgetPassword } from "../_hooks/use-forget-password";
import { forgetPasswordSchema } from "@/lib/schemes/forget-password.schema";

// ================================================================================================================
//&==>Variables
const SUCCESS_MSG = `"Email Sent Successfully 👌"`;
// ================================================================================================================
//^==>Types
type ForgetPasswordProps = {
  setEmail: (value: string) => void;
  onSuccess: () => void;
  currentEmail:string;
};
// ================================================================================================================

export default function EmailForm({
  setEmail,
  onSuccess,
  currentEmail
}: ForgetPasswordProps) {
  // ====================================================================================================
  //*==>Hooks=============> Mutate(ForgetPassword)
  const { onForget, isPending, error } = useForgetPassword();

  // =====================================================================================================
  //*==> React Hook Form(RHF)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgetFormValues>({
    mode: "onBlur",
    resolver: zodResolver(forgetPasswordSchema),
    defaultValues:{
    email: currentEmail? currentEmail: "",
    }
  });
  // ===============================================================================================================
  //?==>Handlers
  const handleForgetEmail: SubmitHandler<ForgetFormValues> = async (
    formValues
  ) => {
    onForget(formValues, {
      onSuccess: (data) => {
        toast.success(data.message || SUCCESS_MSG);
        //*==>Set Email
        setEmail(formValues.email);
        //*==>Show Otp Form
        onSuccess();
      },
    });
  };

  return (
    <div className="forget-password-form w-full">
      <form className=" font-geist" onSubmit={handleSubmit(handleForgetEmail)}>
        <FieldGroup>
          <div>
            <FieldLegend variant="legend" className="font-inter font-bold mb-9">
              Forgot Password
            </FieldLegend>
            <p className="text-gray-500">
              Don’t worry, we will help you recover your account.
            </p>
          </div>
          {/*//*==>Email */}
          <div className="email-input">
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                {...register("email")}
                id="email"
                placeholder="user@example.com"
                type="email"
              />
              {/*//!==>Feedback */}
              {errors.email && (
                <TypingAuthError errorMsg={errors.email.message} />
              )}
            </Field>
          </div>

          {/*//!==>Server Error After Submition */}
          {error && <SubmitionError Msg={error?.message} />}

          {/*//*Submit Btn */}
          <Field>
            <Button disabled={isSubmitting || isPending} type="submit">
              {isPending || isSubmitting ? (
                <Loader className="animate-spin" />
              ) : (
                "Continue"
              )}
              {!isPending && <MoveRight />}
            </Button>
          </Field>

          {/*//? Register Btn */}
          <div>
            <span className="block text-center">
              Don’t have an account?
              <Link
                className="text-maincolor inline-block ms-3"
                href="/register-form"
              >
                Create yours
              </Link>
            </span>
          </div>
        </FieldGroup>
      </form>
    </div>
  );
}
