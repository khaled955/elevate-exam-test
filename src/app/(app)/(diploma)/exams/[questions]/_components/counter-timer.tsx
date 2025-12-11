"use client";
import { useEffect, useState } from "react";

// ==============================================================================================================
type CounterTimerProps = {
  QuestionTime: number;
  onTimeOut: () => void;
};
// =============================================================================================================
export default function CounterTimer({
  QuestionTime,
  onTimeOut,
}: CounterTimerProps) {
  //============================================================================================================
  //*===>States
  const [timeLeft, setTimeLeft] = useState(() => {
    return localStorage.getItem("timeLeft")
      ? Number(localStorage.getItem("timeLeft"))
      : QuestionTime;
  });
  // ==============================================================================================================
  //&===> Variables
  const percentage = (timeLeft / QuestionTime) * 100;

  // ===========================================================================================================
  //*===> Effects
  useEffect(() => {
    if (timeLeft === 0) {
      onTimeOut();
      return;
    }

    //**==> Timer To Decrease Counter
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
      //??==> To Persist Time onMount
      localStorage.setItem("timeLeft", String(timeLeft));
    }, 1000);
    // !!==> Clean Up
    return () => clearInterval(interval);
  }, [timeLeft, onTimeOut]);

  return (
    <div className="flex justify-center items-center mt-4">
      <div className="relative w-24 h-24">
        {/*//*==> Back Circle*/}
        <svg className="w-full h-full rotate-[-90deg]">
          <circle
            cx="50%"
            cy="50%"
            r="45%"
            stroke="#E5E7EB"
            strokeWidth="8"
            fill="none"
          />

          {/*//*==> Timer Progress */}
          <circle
            cx="50%"
            cy="50%"
            r="45%"
            stroke="#2563EB"
            strokeWidth="8"
            fill="none"
            strokeDasharray="283" // Diameter Of Circle
            strokeDashoffset={283 - (283 * percentage) / 100}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 0.3s linear" }}
          />
        </svg>
        {/* //*==>Time */}
        <span className="absolute inset-0 flex items-center justify-center text-xl font-bold text-blue-700">
          {timeLeft < 10 ? `0${timeLeft}` : timeLeft}
        </span>
      </div>
    </div>
  );
}
