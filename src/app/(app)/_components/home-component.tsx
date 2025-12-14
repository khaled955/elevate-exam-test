"use client";
import InfiniteScroll from "react-infinite-scroll-component";
import { Subject } from "@/lib/types/diplomas";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Spinner from "@/components/shared/spinner";
import { useDiplomas } from "@/app/_hooks/use-diplomas";

// =======================================================================================================
export default function HomeComponent() {
  // ======================================================================================================
  // ? Hook===>  Fetch Diplom
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useDiplomas();
  // ======================================================================================================
  //& Variables
  const pages = data?.pages ?? [];

  //^ ====> To Convert All Pages Into One Page
  const diplomas: Subject[] = pages.flatMap((page) => page.subjects);
  const router = useRouter();
  // ======================================================================================================

  /*//^ ================================
                                   App => HomePage Jsx
                               ================================ //*/
  return (
    <>
      <div className="min-h-screen relative">
        <div className="mt-4">
          {/* Infinite Scroll Component */}
          <InfiniteScroll
            dataLength={diplomas.length}
            next={() => {
              if (isFetchingNextPage) return;
              if (!hasNextPage) return;
              fetchNextPage();
            }}
            hasMore={!!hasNextPage}
            loader={
              <h4 className="text-center text-gray-600 font-geist">
                Scroll to view more
              </h4>
            }
            endMessage={
              !isLoading && (
                <p style={{ textAlign: "center" }}>
                  <b>You have seen it all Diplomas</b>
                </p>
              )
            }
          >
            {isLoading ? (
              <Spinner />
            ) : (
              //!===> Ui That Display Inside Infinite Scroll
              <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                {diplomas.map((diploma) => (
                  <li
                    key={diploma._id}
                    className="relative cursor-pointer"
                    onClick={() => {
                      return router.push(`/exams`);
                    }}
                  >
                    <Image
                      src={`${diploma.icon}`}
                      alt={diploma.name}
                      className="object-cover"
                      style={{
                        width: "100%",
                        height: "100%",
                      }}
                      width={500}
                      height={0}
                    />
                    {/* //^===> Diploma Title */}
                    <span className="absolute bottom-3 left-3 right-3 bg-[#155DFC80] py-5 pl-4 pr-16 text-xl font-semibold text-white">
                      {diploma.name}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </InfiniteScroll>
        </div>
      </div>
    </>
  );
}
