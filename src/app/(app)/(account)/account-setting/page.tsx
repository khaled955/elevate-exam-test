"use client";
import { Button } from "@/components/ui/button";
import { CircleUserRound, Lock, LogOut } from "lucide-react";
import { useState } from "react";
import UpdateForm from "./_component/update-form";
import ChangePasswordForm from "./_component/change-password-form";
import { signOut } from "next-auth/react";

export default function AccountSettingPage() {
  // ==============================================================================================================
  //**===>States
  const [showProfileForm, setShowProfileForm] = useState(true);

  // ==============================================================================================================
  //??===> Handlers
  function handleShowProfileForm() {
    setShowProfileForm(true);
  }

  function handleShowPasswordChangeForm() {
    setShowProfileForm(false);
  }

  const onLogOut = async () => {
    await signOut();
    location.href = "/login-form";
  };

  // =========================================================================================================

  /*//^ ================================
                                   App => Account Setting Jsx
                                ================================ //*/

  return (
    <div className="parent mt-4 flex flex-col sm:flex-row gap-3">
      <div className="navigate-btn relative bg-white p-4 mb-6 sm:mb-0">
        <ul>
          <li
            // *==> Navigate To Profile Btn
            onClick={handleShowProfileForm}
            className={`${
              showProfileForm ? "bg-blue-50 text-blue-600" : "text-gray-500"
            } cursor-pointer flex p-2 mb-3 gap-2 `}
          >
            <CircleUserRound /> <span>Profile</span>
          </li>
          <li
            // *==> Navigate To Change Pass Btn
            onClick={handleShowPasswordChangeForm}
            className={`${
              !showProfileForm ? "bg-blue-50 text-blue-600" : "text-gray-500"
            } cursor-pointer flex p-2 mb-3 gap-2 `}
          >
            <Lock /> <span>Change Password</span>
          </li>
        </ul>
        {/*//!!==> LogOut Btn */}
        <div className="log-out-btn absolute top-[83%] left-[50%] -translate-x-[50%] w-full flex">
          <Button
            onClick={onLogOut}
            className="text-red-600 w-full sm:w-[90%] flex"
            variant={"secondary"}
          >
            <LogOut className="rotate-180" /> Logout
          </Button>
        </div>
      </div>
      <div className="account-info grow">
        {showProfileForm && <UpdateForm />}
        {!showProfileForm && <ChangePasswordForm />}
      </div>
    </div>
  );
}
