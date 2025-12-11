"use client";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { CircleChevronLeft, CircleChevronRight } from "lucide-react";

import "./globals.css";
import Providers from "@/components/context/app";
import SideBar from "@/components/layout/app/side-bar";
import Header from "@/components/layout/app/header";
import { usePathname } from "next/navigation";
import MyBreadCrumb from "@/components/layout/app/my-bread-crumb";
import { useState } from "react";

// ======================================================================================================
// % Font Config
export const inter = Inter({
  weight: ["400", "600", "700", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// ========================================================================================================

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // ======================================================================================================
  //* States
  const [showSideBar, setShowSideBar] = useState(false);

  // ======================================================================================================

  // & Variables
  const pathName = usePathname();

  const publicPath = ["/login-form", "/register-form", "/forget-password"];

  // ^ To Prevent Separate App Layout From Auth Layout
  const isPublic = publicPath.some((p) => pathName === p);

  // =====================================================================================================

  // ! Handlers
  function handleShowSideBar() {
    setShowSideBar(true);
  }

  function handleHideSideBar() {
    setShowSideBar(false);
  }
  /*//^ ================================
                                   App => Rootlayout Jsx
                                ================================ //*/

  return (
    <html lang="en">
      <body className="antialiased min-h-screen overflow-x-hidden">
        <Providers>
          {/* Toaster */}
          <Toaster />

          {/* Display Header And Sidebar And Breadcrumb */}
          {!isPublic ? (
            <div className="main-layout-parent flex">
              <div className={`${showSideBar ? "block" : "hidden"} sm:block`}>
                {/* SideBar */}
                <SideBar onClick={handleHideSideBar} />
              </div>

              {/* Toggle Btn */}
              <div
                className={`toggle-btn fixed ${
                  showSideBar ? "left-44 top-16" : "left-0 top-10"
                } z-50 sm:hidden`}
              >
                {/* Show Btn */}
                {!showSideBar && (
                  <CircleChevronRight size={40} onClick={handleShowSideBar} />
                )}
                {/* Hide Btn */}
                {showSideBar && (
                  <CircleChevronLeft size={40} onClick={handleHideSideBar} />
                )}
              </div>

              <div className="bread-crum-route-container flex-grow p-3 sm:pl-[13.5rem]">
                <div className="bread-crumb px-3 mb-2">
                  {/* BreadCrumb */}
                  <MyBreadCrumb />
                </div>

                {/* Parent Of Routes */}
                <div className="route-children min-h-screen bg-[#f9fafb]">
                  <div className="nested-parent px-4 relative">
                    {/* Header */}
                    <Header />

                    {/*Tanstack Query Dev Tools */}
                    <>
                      <ReactQueryDevtools initialIsOpen={false} />
                    </>
                    <div className="relative">
                      {/*//*===>App Layout */}
                      {children}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // *===> Auth Layout Display
            <div className="relative">{children}</div>
          )}
        </Providers>
      </body>
    </html>
  );
}
