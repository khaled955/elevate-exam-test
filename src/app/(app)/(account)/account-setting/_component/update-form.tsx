"use client";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TypingAuthError from "@/components/shared/typing-auth-error";
import SubmitionError from "@/components/shared/submition-error";

import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useUpdateProfile } from "../_hooks/use-update-profile";
import Spinner from "@/components/shared/spinner";
import DeleteAlert from "./delete-alert";
import {
  UpdateProfileFormValues,
  updateProfileSchema,
} from "@/lib/schemes/update-profile.schema";

export default function UpdateForm() {
  // =============================================================================================================
  //*==>States
  const [showDeleteDialog, setshowDeleteDialog] = useState(false);
  // const { data: session, status, update } = useSession();
  // ===============================================================================================================
  //&&==> Variables
  // const currentUser = session?.user as AuthUser | undefined;

  // ==============================================================================================================
  //^==> React Hook Form(RHF)
  const {
    register,
    control,
    formState: { errors, isSubmitting, isDirty },
    reset,
    handleSubmit,
  } = useForm<UpdateProfileFormValues>({
    mode: "onBlur",

    resolver: zodResolver(updateProfileSchema),
  });
  // ============================================================================================================
  //*===>Hooks ================> Mutate(Update)
  const {
    error: updateError,
    isPending: updatePending,
    mutate: onUpdateProfile,
    status,
    currentUser,
  
  } = useUpdateProfile();
  // =========================================================================================================

  // ===========================================================================================================
  //??==> Handlers
  const handleUpdateProfile: SubmitHandler<UpdateProfileFormValues> = (
    data
  ) => {
    // Check If User No Change Any Data
    if (!isDirty) {
      toast("No Data Changed");
      return;
    }

    onUpdateProfile(data, {
      // onSuccess: async (data) => {
      //   if (!data) return;
      //   toast.success(data.message);

      //   await update({
      //     user: {
      //       ...(currentUser ?? {}),
      //       email: data.user.email,
      //       firstName: data.user.firstName,
      //       lastName: data.user.lastName,
      //       username: data.user.username,
      //       phone: `+20${data.user.phone}`,
      //     },
      //   });
      // },
      // onError: (error) => {
      //   toast.error(error.message || "Failed to Update Data");
      // },
    });
  };

  function handleShowDeleteDialog() {
    setshowDeleteDialog(true);
  }
  function handleHideDeleteDialog() {
    setshowDeleteDialog(false);
  }

  // ===============================================================================================================

  //*===> Effects
  useEffect(() => {
    //!Guard Clause
    if (!currentUser) return;

    //^==========> Fill with data from session on first load
    reset({
      email: currentUser.email ?? "",
      firstName: currentUser.firstName ?? "",
      lastName: currentUser.lastName ?? "",
      username: currentUser.username ?? "",
      phone: currentUser.phone ?? "",
    });
  }, [currentUser, reset]);

  return (
    <>
      {/*//*==> Loader */}
      {status === "loading" ? (
        <Spinner />
      ) : (
        <div className="update-form p-4 bg-white">
          <form
            onSubmit={handleSubmit(handleUpdateProfile)}
            className=" font-geist"
          >
            <FieldGroup>
              <FieldGroup>
                {/*  first and last name inputs */}
                <div className="first-last-name-inputs flex gap-4 flex-wrap md:flex-nowrap">
                  <Field>
                    {/*//* First Name */}
                    <FieldLabel htmlFor="first-name">First name</FieldLabel>
                    <Input
                      {...register("firstName")}
                      id="first-name"
                      type="text"
                    />

                    {/*//!==> Feedback */}
                    {errors.firstName && (
                      <TypingAuthError errorMsg={errors.firstName.message} />
                    )}
                  </Field>

                  {/*//* Last Name */}
                  <Field>
                    <FieldLabel htmlFor="last-name">Last name</FieldLabel>
                    <Input
                      {...register("lastName")}
                      id="last-name"
                      type="text"
                    />

                    {/*//!==> Feedback */}
                    {errors.lastName && (
                      <TypingAuthError errorMsg={errors.lastName.message} />
                    )}
                  </Field>
                </div>
              </FieldGroup>

              {/*//* User Name */}
              <div className="user-name">
                <Field>
                  <FieldLabel htmlFor="user-name">Username</FieldLabel>
                  <Input {...register("username")} id="user-name" type="text" />

                  {/*//!==> Feedback */}
                  {errors.lastName && (
                    <TypingAuthError errorMsg={errors.username?.message} />
                  )}
                </Field>
              </div>

              {/*//* Email */}
              <div className="email-input">
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input {...register("email")} id="email" type="email" />

                  {/*//!==> Feedback */}
                  {errors.email && (
                    <TypingAuthError errorMsg={errors.email.message} />
                  )}
                </Field>
              </div>

              {/*//* Phone */}
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

                  {/*//!==> Feedback */}
                  {errors.phone && (
                    <TypingAuthError errorMsg={errors.phone.message} />
                  )}
                </Field>
              </div>

              {/*//!==> Error Msg After Submition */}

              {updateError && <SubmitionError Msg={updateError?.message} />}

              {/*//*==> Buttons */}
              <div className="flex justify-between gap-5">
                {/*//!==>Delte Btn */}
                <Button
                  onClick={handleShowDeleteDialog}
                  variant={"secondary"}
                  className="grow text-red-600"
                  disabled={updatePending || isSubmitting}
                  type="button"
                >
                  Delete My Account
                </Button>

                {/*//?==>Update Btn */}
                <Button
                  className="grow"
                  disabled={updatePending || isSubmitting}
                  type="submit"
                >
                  {updatePending || isSubmitting ? (
                    <Loader className="animate-spin" />
                  ) : (
                    "Save Changes "
                  )}
                </Button>
              </div>

              <div></div>
            </FieldGroup>
          </form>
        </div>
      )}

      {/*//^==> Delete Alert */}

      {showDeleteDialog && <DeleteAlert onClose={handleHideDeleteDialog} />}
    </>
  );
}
