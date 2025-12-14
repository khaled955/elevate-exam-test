"use client";
import { checkIconAndHeaderText } from "@/lib/utils/check-icon-header-text";
import { ChevronLeft } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export default function Header() {
  // ===========================================================================================================
  //& Variables
  const pathName = usePathname();
  const router = useRouter();
  const isHome = pathName === "/";

  // ===========================================================================================================
  // !! Handlers
  function handlePrevNavigate() {
    router.back();
  }

  /*//^ ================================
                                   App => Header Jsx
                                ================================ //*/

  return (
    <div className="header flex gap-3 ml-6 sm:ml-0">
      {!isHome && (
        <div className="left-action-btn border flex justify-center items-center">
          {/*//*=>> Prev Btn */}
          <ChevronLeft
            onClick={handlePrevNavigate}
            className="text-blue-600 cursor-pointer"
          />
        </div>
      )}
      {/*//^^ Header Title */}
      <div className="header-title capitalize text-white bg-blue-600 flex-grow flex items-center gap-2 p-4 font-semibold text-3xl">
        {checkIconAndHeaderText(pathName)}
      </div>
    </div>
  );
}
