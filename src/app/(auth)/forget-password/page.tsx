"use client";
import { useState } from "react";
import ForgetPasswordForm from "./_components/ForgetPasswordForm";
import VerifyOtpForm from "./_components/VerifyOtpForm";
import CreateNewPasswordForm from "./_components/CreateNewPasswordForm";

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
                                   Auth => Forget Password Jsx
                                ================================ //*/
  return (
    <div>
      {/* //*==> Email Form */}
      {showEmailForm && (
        <ForgetPasswordForm
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
          onClick={() => {
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
