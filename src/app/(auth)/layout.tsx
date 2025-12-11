import { ReactNode } from "react";
import AuthComponent from "./_components/AuthComponent/AuthComponent";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col sm:flex-row justify-center">
      <div className="py-9 w-full sm:w-[50%] bg-[#EFF6FFBF] relative">
        <div className="over-lay absolute inset-0 bg-[url('/assets/images/overlay.png')] bg-cover bg-center blur-[200px]"></div>
        <AuthComponent />
      </div>

      <div className="py-9 px-6 w-full sm:w-[50%] bg-white relative flex flex-col gap-7 items-center order-first sm:order-1">
        {children}
      </div>
    </div>
  );
}
