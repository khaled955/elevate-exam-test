"use client";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { LoginFormValues } from "@/lib/types/authentication";
import TypingAuthError from "@/components/shared/typing-auth-error";
import SubmitionError from "@/components/shared/submition-error";
import { Loader } from "lucide-react";
import { useLogin } from "./_hooks/use-login";
import { loginSchema } from "@/lib/schemes/login-form.schema";

// ==============================================================================================================
//&==>Variables
const defaultValues: LoginFormValues = {
  email: "",
  password: "",
};
// ===============================================================================================================

export default function LoginPage() {
  // ============================================================================================================
  //*==> Hooks===============> Mutate(Login)
  const { mutateAsync: onLogin, error, isPending } = useLogin();
  // ==============================================================================================================
  //*===>React Hook Form (RHF)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    mode: "onBlur",
    resolver: zodResolver(loginSchema),
    defaultValues,
  });
  // ==============================================================================================================
  //?==> Handlers
  const handleLogin: SubmitHandler<LoginFormValues> = async (data) => {
    await onLogin(data);
  };

  /*//^ ================================
                                   Autj => Login Jsx
                                ================================ //*/

  return (
    <div className="login-form w-full">
      <form className=" font-geist" onSubmit={handleSubmit(handleLogin)}>
        <FieldGroup>
          <FieldLegend variant="legend" className="font-inter font-bold mb-9">
            Login
          </FieldLegend>

          {/* //*==>Email  */}
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

          {/*//*==>Password */}
          <div className="password-input">
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <PasswordInput
                id="password"
                placeholder="**************"
                type="password"
                {...register("password")}
              />

              {/*//!==>Feedback */}
              {errors.password && (
                <TypingAuthError errorMsg={errors.password.message} />
              )}
            </Field>
          </div>

          {/*//!==> Error After Submit */}
          {error && <SubmitionError Msg={error.message} />}

          {/*//?==>Forget Btn */}
          <div className="forget-btn flex justify-end">
            <Link className="text-maincolor" href="/forget-password">
              Forgot your password?
            </Link>
          </div>

          {/*//*==>Login Btn */}
          <Field>
            <Button disabled={isSubmitting || isPending} type="submit">
              {isSubmitting || isPending ? (
                <Loader className="animate-spin" />
              ) : (
                "Login"
              )}
            </Button>
          </Field>

          {/*//&==> Register Btn */}
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
