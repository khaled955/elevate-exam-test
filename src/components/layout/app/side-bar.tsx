"use client";
import Image from "next/image";
import { EllipsisVertical, GraduationCap, User2 } from "lucide-react";
import avatar from "../../../../public/assets/images/Avatar.svg";
import finalLogo from "../../../../public/assets/images/Final Logo 1.svg";
import examLogo from "../../../../public/assets/images/Logo.svg";
import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import Spinner from "@/components/shared/spinner";
import { AuthUser } from "@/lib/types/authentication";
import { ReactNode, useState } from "react";
import { Button } from "@/components/ui/button";

// ========================================================================================================
// & Types
type SideBarProps = {
  onClick: () => void;
};

type RouteProperity = {
  name: string;
  icon: ReactNode;
  path: string;
};

// ========================================================================================================

// & Variables
const ACCOUNT_SEETING_PATH = `/account-setting`;
const HOME_PATH = `/`;

const routes: RouteProperity[] = [
  { name: "Diplomas", icon: <GraduationCap />, path: HOME_PATH },
  { name: "Account-Settings", icon: <User2 />, path: ACCOUNT_SEETING_PATH },
];
// ===========================================================================================================
// ! Handlers
/**
 * Logs the current user out of the application.
 *
 * This function triggers NextAuth's `signOut()` to clear the authentication session,
 * then redirects the user to the login page (`/login-form`).
 *
 * @function
 * @returns {void} No return value.
 */

function handleLogOut(): void {
  signOut();
  location.href = "/login-form";
}

// ==========================================================================================================

export default function SideBar({ onClick }: SideBarProps) {
  // ==============================================================================
  // * States
  const [showLogoutBtn, setShowLogoutBtn] = useState(false);

  // ===============================================================================
  // & Variables
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const currentUser = session?.user as AuthUser | undefined;

  // ===========================================================================================================

  // ! Handlers
  function handleNavigate(path: string) {
    onClick();
    router.push(path);
  }

  function handleToggleLogoutBtn() {
    setShowLogoutBtn((current) => !current);
  }

  // ============================================================================================================

  /*//^ ================================
                                           App => Side Bar Jsx
                                         ================================ //*/

  return (
    <div className="bg-blue-50 min-h-screen p-3 fixed left-0 top-0 bottom-0 z-50">
      <div className="header mb-9">
        {/* Logo */}
        <header>
          <div className="final-logo relative">
            <Image width={192} height={0} src={finalLogo} alt="final logo" />
          </div>
          <div className="exam-logo relative">
            <Image width={100} height={0} src={examLogo} alt="exam logo" />
          </div>
        </header>
      </div>

      {/* Title & Routes */}
      <div className="side-bar-list">
        <ul className="space-y-4">
          {/* Routes */}
          {routes.map((route: RouteProperity, index: number) => (
            <li key={index}>
              <button
                onClick={() => handleNavigate(route.path)}
                className={`${
                  pathname === route.path
                    ? "bg-blue-100 text-blue-500 border border-blue-500"
                    : ""
                } flex gap-2 w-full p-3 text-gray-500`}
              >
                {route.icon} <span>{route.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer */}
      {status === "loading" ? (
        <Spinner />
      ) : (
        <>
          <div className="avatar-info absolute bottom-4 left-0 flex gap-1 items-center px-2 justify-between">
            <div className="avatar-image relative">
              <Image width={60} height={0} src={avatar} alt="avatar photo" />
            </div>

            {/* Avatar Info */}
            <div className="avatar-info w-[80%] ">
              <h2 className="text-blue-600 mb-0">{currentUser?.firstName}</h2>
              <p className="email text-gray-500 text-sm">
                {currentUser?.lastName}
              </p>
            </div>

            <div className="action-btn relative">
              <EllipsisVertical
                onClick={handleToggleLogoutBtn}
                className="cursor-pointer"
              />

              {/* LogOut Btn */}
              {showLogoutBtn && (
                <Button
                  onClick={handleLogOut}
                  variant="outline"
                  className=" absolute left-0 bottom-10 rounded-sm font-semibold text-blue-600"
                >
                  Logout
                </Button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
