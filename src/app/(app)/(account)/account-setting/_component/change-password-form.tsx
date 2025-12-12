"use client";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { PasswordInput } from "@/components/ui/password-input";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { changePasswordFormValues } from "@/lib/types/authentication";
import TypingAuthError from "@/components/shared/typing-auth-error";
import { useChangePassword } from "../_hooks/use-change-password";
import SubmitionError from "@/components/shared/submition-error";
import { Loader } from "lucide-react";
import { changePassworSchema } from "@/lib/schemes/change-password.schema";

// =============================================================================================================
// &==> Variables
const defaultValues: changePasswordFormValues = {
  password: "",
  rePassword: "",
  oldPassword: "",
};
// ==============================================================================================================

export default function ChangePasswordForm() {
  // ============================================================================================================
  //^===> React Hook Form (RHF)
  const {
    register,

    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<changePasswordFormValues>({
    mode: "onBlur",
    resolver: zodResolver(changePassworSchema),
    defaultValues,
  });
  // ============================================================================================================
  //??====> Hooks===========> Mutate

  const {
    mutate: onChangePassword,
    isPending,
    error: errorAfterSubmit,
  } = useChangePassword();

  // ===============================================================================================================
  //**===> Handlers
  const handleChangePassword: SubmitHandler<changePasswordFormValues> = (
    data
  ) => {
    onChangePassword(data);
  };

  // =============================================================================================================

  /*//^ ================================
                                   App => Account Setting ==> Change Password Jsx
                                ================================ //*/

  return (
    <div className="change-password-form p-4 bg-white">
      <form
        onSubmit={handleSubmit(handleChangePassword)}
        className="register-form font-geist"
      >
        <FieldGroup>
          {/*//*==> Old Password-input */}
          <div className="Current-Password-input">
            <Field>
              <FieldLabel htmlFor="currentPassword">
                Current Password
              </FieldLabel>
              <PasswordInput
                id="currentPassword"
                placeholder="**************"
                type="password"
                {...register("oldPassword")}
              />

              {/* //!==> Feedback */}
              {errors.oldPassword && (
                <TypingAuthError errorMsg={errors.oldPassword.message} />
              )}
            </Field>
          </div>

          {/* //*==> New-Password-input */}
          <div className="new-Password-input">
            <Field>
              <FieldLabel htmlFor="newPassword">New Password</FieldLabel>
              <PasswordInput
                id="newPassword"
                placeholder="**************"
                type="password"
                {...register("password")}
              />

              {/* //!==> Feedback */}
              {errors.password && (
                <TypingAuthError errorMsg={errors.password.message} />
              )}
            </Field>
          </div>

          {/*//*==> Confirm-new-password-input */}
          <div className="confirm-new-password-input">
            <Field>
              <FieldLabel htmlFor="confirmNewPassword">
                Confirm New Password
              </FieldLabel>
              <PasswordInput
                id="confirmNewPassword"
                placeholder="***************"
                type="password"
                {...register("rePassword")}
                onPaste={(e) => e.preventDefault()}
              />

              {/* //!==> Feedback */}
              {errors.rePassword && (
                <TypingAuthError errorMsg={errors.rePassword.message} />
              )}
            </Field>
          </div>

          {/*//!==> Error After Submition */}

          {errorAfterSubmit && (
            <SubmitionError Msg={errorAfterSubmit.message} />
          )}

          {/*//*==> Submit Bnt */}
          <Field>
            <Button disabled={isSubmitting || isPending} type="submit">
              {isPending ? (
                <Loader className="animate-spin" />
              ) : (
                " Update Password"
              )}
            </Button>
          </Field>

          <div></div>
        </FieldGroup>
      </form>
    </div>
  );
}
