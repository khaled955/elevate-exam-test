"use client";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
} from "@/components/ui/field";
import {
  CreateNewPasswordFormValues,
  CreateNewPasswordPayload,
} from "@/lib/types/authentication";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { Loader, MoveRight } from "lucide-react";
import TypingAuthError from "@/components/shared/typing-auth-error";
import SubmitionError from "@/components/shared/submition-error";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/ui/password-input";
import { useCreateNewPassword } from "../_hooks/use-create-new-password";
import { createNewPasswordSchema } from "@/lib/schemes/forget-password.schema";

// ===============================================================================================================
//&==>Variables
const defaultValues = {
  email: "",
  newPassword: "",
};
// ============================================================================================================
//*==>Types
type CreateNewPassordFormProps = {
  onSetCurrentEmail: () => void;
  currentEmail: string | null;
};
// ==============================================================================================================

export default function CreateNewPasswordForm({
  currentEmail,
  onSetCurrentEmail,
}: CreateNewPassordFormProps) {
  // ================================================================================================================
  //*====>Hooks==============> Mutate(Create)
  const { onCreateNewPassword, error, isPending } =
    useCreateNewPassword(onSetCurrentEmail);

  // ==============================================================================================================
  //^==> React Hook Form (RHF)
  const {
    register,
    handleSubmit,

    formState: { errors, isSubmitting },
  } = useForm<CreateNewPasswordFormValues>({
    mode: "onBlur",
    resolver: zodResolver(createNewPasswordSchema),
    defaultValues,
  });
  // ================================================================================================================
  //?==>Handlers
  const handleCreateNewPassword: SubmitHandler<CreateNewPasswordFormValues> = (
    data
  ) => {
    //*==>Guard Clause
    if (!currentEmail) return;

    const payload: CreateNewPasswordPayload = {
      email: currentEmail,
      newPassword: data.newPassword,
    };

    onCreateNewPassword(payload);
  };

  return (
    <div className="forget-password-form w-full">
      <form
        className=" font-geist"
        onSubmit={handleSubmit(handleCreateNewPassword)}
      >
        <FieldGroup>
          <div>
            <FieldLegend variant="legend" className="font-inter font-bold mb-9">
              Create a New Password
            </FieldLegend>
            <p className="text-gray-500">
              Create a new strong password for your account.
            </p>
          </div>

          {/*//*==>Password */}
          <div className="password-input">
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <PasswordInput
                id="password"
                placeholder="**************"
                type="password"
                {...register("newPassword")}
              />
              {/*//!==>Feedback */}
              {errors.newPassword && (
                <TypingAuthError errorMsg={errors.newPassword.message} />
              )}
            </Field>
          </div>
          {/*//*==>Repassword */}
          <div className="rePassword-input">
            <Field>
              <FieldLabel htmlFor="repassword">Confirm Password</FieldLabel>
              <PasswordInput
                id="repassword"
                placeholder="***************"
                type="password"
                {...register("rePassword")}
                onPaste={(e) => e.preventDefault()}
              />
              {/*//!==>Feedback */}
              {errors.rePassword && (
                <TypingAuthError errorMsg={errors.rePassword.message} />
              )}
            </Field>
          </div>

          {/*//!==>Server Error After Submition */}

          {error && <SubmitionError Msg={error.message} />}

          {/*//*==>  Submit Btn*/}
          <Field>
            <Button disabled={isSubmitting || isPending} type="submit">
              {isPending || isSubmitting ? (
                <Loader className="animate-spin" />
              ) : (
                "Reset Password"
              )}
              {!isPending && <MoveRight />}
            </Button>
          </Field>

          {/*//?==> Register Btn */}
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
