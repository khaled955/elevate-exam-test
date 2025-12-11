"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { generateBreadcrumbs } from "@/lib/utils/generate-bread-crum";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MyBreadCrumb() {
  // =============================================================================================================
  // & Variables
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  // ==========================================================================================================

  // !! Utility ===> To Generate Paths
  const crumbs = generateBreadcrumbs(segments);

  /*//^ ================================
                                   App => Bread Crumb Jsx
                                ================================ //*/

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          {pathname === "/" ? (
            //! When the user is already on Home → disable link
            <BreadcrumbPage className="cursor-default opacity-60">
              Home
            </BreadcrumbPage>
          ) : (
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          )}
        </BreadcrumbItem>

        {crumbs.map((crumb, index) => (
          <div key={crumb.href} className="flex items-center gap-2">
            <BreadcrumbSeparator />

            <BreadcrumbItem>
              {index === crumbs.length - 1 ? (
                <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
              ) : (
                <Link href={crumb.href}>{crumb.label}</Link>
              )}
            </BreadcrumbItem>
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
