"use client";
import { FieldGroup, FieldLegend } from "@/components/ui/field";
import Link from "next/link";
import { MoveLeft } from "lucide-react";
import { InputOTPForm } from "@/components/ui/Input-otp-form";
import { useEffect, useState } from "react";

// ===========================================================================================================
//^==>Types
type VerifyOtpProps = {
  onSuccess: () => void;
  currentEmail: string;
  onClick: () => void;
};
// ==========================================================================================================

export default function VerifyOtpForm({
  currentEmail,
  onSuccess,
  onClick,
}: VerifyOtpProps) {
  // =============================================================================================================
  //*==>States
  const [secondsLeft, setSecondsLeft] = useState(60);
  // ================================================================================================================
  //^==>Effects
  useEffect(() => {
    const intervalId = setInterval(() => {
      //?==>Timer To Resend Otp
      setSecondsLeft((prev: number) => (prev <= 0 ? 0 : prev - 1));
    }, 1000);

    //!==>Clean Up
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  // ====================================================================================================================

  return (
    <div className="forget-password-form w-full">
      <div className=" font-geist">
        <FieldGroup>
          <div>
            {/*//*==>Back Btn */}
            <button
              onClick={onClick}
              className="border border-gray-200 p-2 mb-6"
            >
              <MoveLeft />
            </button>

            <FieldLegend variant="legend" className="font-inter font-bold mb-9">
              Verify OTP
            </FieldLegend>

            <div className="mb-4">
              <p className="text-gray-500">
                Please enter the 6-digits code we have sent to:
              </p>
              <span className="text-gray-800">
                {currentEmail}
                {/*//*==>Edit Btn */}
                <button className="text-blue-600" onClick={onClick}>
                  Edit
                </button>
              </span>
            </div>

            {/*//?==>Otp Input */}
            <InputOTPForm
              setSeconds={setSecondsLeft}
              secondLeft={secondsLeft}
              currentEmail={currentEmail}
              onSuccess={onSuccess}
            />
          </div>

          <div>
            {/*//^==> Register Btn */}
            <span className="">
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
      </div>
    </div>
  );
}
