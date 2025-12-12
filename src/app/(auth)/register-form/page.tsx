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
import { PhoneInput } from "@/components/ui/phone-input";
import Link from "next/link";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { RegisterFormValues } from "@/lib/types/authentication";
import TypingAuthError from "@/components/shared/typing-auth-error";
import SubmitionError from "@/components/shared/submition-error";
import { Loader } from "lucide-react";
import { useRegister } from "./_hooks/use-register";
import { registerSchema } from "@/lib/schemes/register-form.schema";

// =============================================================================================================
//&==> Variables
const defaultValues: RegisterFormValues = {
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  password: "",
  rePassword: "",
  phone: "",
};

export default function RegisterPage() {
  // =========================================================================================================
  //*=====>Hooks=============> Mutate(Register)
  const { onRegister, isPending, error } = useRegister();
  // =============================================================================================================
  //^===> React Hook Form(RHF)
  const {
    register,
    control,
    getValues,
    setError,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<RegisterFormValues>({
    mode: "onBlur",
    resolver: zodResolver(registerSchema),
    defaultValues,
  });
  // ===========================================================================================================
  //??==>Handlers
  const handleRegister: SubmitHandler<RegisterFormValues> = (data) => {
    onRegister(data, {
      onError: (error) => {
        // Array of keys for form
        const formField = Object.keys(getValues());
        // current Error
        const currentFieldError = formField.find((field) =>
          error.message.startsWith(field)
        );
        if (currentFieldError) {
          setError(
            currentFieldError as keyof RegisterFormValues,
            {
              type: "custom",
              message: error.message,
            },
            { shouldFocus: true }
          );

          error.message = "";
        }
      },
    });
  };
  /*//^ ================================
                                   Auth => Register Jsx
                                ================================ //*/
  return (
    <div className="register-form">
      <form
        onSubmit={handleSubmit(handleRegister)}
        className="register-form font-geist"
      >
        <FieldGroup>
          <FieldLegend variant="legend" className="font-inter font-bold mb-9">
            Create Account
          </FieldLegend>

          <FieldGroup>
            {/*//*==>First Name */}
            <div className="first-last-name-inputs flex gap-4 flex-wrap md:flex-nowrap">
              <Field>
                <FieldLabel htmlFor="first-name">First name</FieldLabel>
                <Input
                  {...register("firstName")}
                  id="first-name"
                  placeholder="Ahmed"
                  type="text"
                />
                {/*//!==>Feedback */}
                {errors.firstName && (
                  <TypingAuthError errorMsg={errors.firstName.message} />
                )}
              </Field>

              {/*//*==>Last Name */}
              <Field>
                <FieldLabel htmlFor="last-name">Last name</FieldLabel>
                <Input
                  {...register("lastName")}
                  id="last-name"
                  placeholder="Abdullah"
                  type="text"
                />
                {/*//!==>Feedback */}
                {errors.lastName && (
                  <TypingAuthError errorMsg={errors.lastName.message} />
                )}
              </Field>
            </div>
          </FieldGroup>

          {/*//*==> User Name */}
          <div className="user-name">
            <Field>
              <FieldLabel htmlFor="user-name">Username</FieldLabel>
              <Input
                {...register("username")}
                id="user-name"
                placeholder="user123"
                type="text"
              />
              {/*//!==>  Feedback */}
              {errors.username && (
                <TypingAuthError errorMsg={errors.username?.message} />
              )}
            </Field>
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

          {/*//*==>Phone */}
          <div className="phone-input">
            <Field>
              <FieldLabel htmlFor="phone">Phone</FieldLabel>
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <PhoneInput
                    value={field.value}
                    onChange={(val) => field.onChange(val ?? "")}
                    placeholder="e.g. 002010xxxxxxxx"
                    countries={["EG"]}
                  />
                )}
              />

              {/*//!==>Feedback  */}
              {errors.phone && (
                <TypingAuthError errorMsg={errors.phone.message} />
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

          {/*//*==>rePassword */}
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

          {/*//!==>Errorn After Submit*/}
          {error?.message && <SubmitionError Msg={error?.message} />}

          {/*//?==>Submit Btn */}
          <Field>
            <Button disabled={isPending || isSubmitting} type="submit">
              {isPending || isSubmitting ? (
                <Loader className="animate-spin" />
              ) : (
                "Create Account"
              )}
            </Button>
          </Field>
          <div>
            {/*//*==> Login Btn */}
            <span>
              Already have an account?
              <Link className="text-maincolor" href="/login-form">
                Login
              </Link>
            </span>
          </div>
        </FieldGroup>
      </form>
    </div>
  );
}
