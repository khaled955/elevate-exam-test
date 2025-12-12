"use client";
import { useState } from "react";
import VerifyOtpForm from "./_components/verify-otp-form";
import EmailForm from "./_components/email-form";
import CreateNewPasswordForm from "./_components/create-new-password-form";

export default function ForgetPasswordPage() {
  // ==============================================================================================================
  //*==>States
  const [showEmailForm, setShowEmailForm] = useState(true);
  const [showVerifyOtpForm, setShowVerifyOtpForm] = useState(false);
  const [showNewPasswordForm, setShowNewPasswordForm] = useState(false);
  const [currentEmail, setCurrentEmail] = useState<null | string>(null);

  // ===============================================================================================================
  //??==> Handlers
  function handleShowEmailForm() {
    setShowEmailForm(true);
  }

  function handleHideVerifyOtpForm() {
    setShowVerifyOtpForm(false);
  }

  function handleSetCurrentEmail() {
    setCurrentEmail(null);
  }

  // ===============================================================================================================

  /*//^ ================================
                                   Auth => Forget Password Page Jsx
                                ================================ //*/
  return (
    <div>
      {/* //*==> Email Form */}
      {showEmailForm && (
        <EmailForm
          currentEmail={currentEmail!}
          setEmail={setCurrentEmail}
          onSuccess={() => {
            setShowEmailForm(false);
            setShowVerifyOtpForm(true);
          }}
        />
      )}
      {/*//*=> Verify Form */}
      {showVerifyOtpForm && (
        <VerifyOtpForm
          onSuccess={() => {
            setShowVerifyOtpForm(false);
            setShowNewPasswordForm(true);
          }}
          currentEmail={currentEmail!}
          onBack={() => {
            handleSetCurrentEmail();
            handleHideVerifyOtpForm();
            handleShowEmailForm();
          }}
          onEdit={() => {
            handleHideVerifyOtpForm();
            handleShowEmailForm();
          }}
        />
      )}
      {/* //*==> Create New Password Form */}
      {showNewPasswordForm && currentEmail && (
        <CreateNewPasswordForm
          onSetCurrentEmail={handleSetCurrentEmail}
          currentEmail={currentEmail!}
        />
      )}
    </div>
  );
}
