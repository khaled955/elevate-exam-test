"use client";
import Image from "next/image";
import notFound from "../../public/assets/images/not-found.jpg";
import { Button } from "@/components/ui/button";
export default function NotFound() {
  // ============================================================================================================
  // ?==> Handlers
  function handleNavigateToHome() {
    location.href = "/";
  }
  // ============================================================================================================
  return (
    <div className="flex flex-col gap-3 justify-center items-center mt-4">
      <div className="imge">
        <Image src={notFound} alt="not-found" />
      </div>
      <Button onClick={handleNavigateToHome}>Go Home</Button>
    </div>
  );
}
