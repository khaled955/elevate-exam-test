"use client";
import { Exam } from "@/lib/types/exam";
import { Clock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useExams } from "./_hooks/use-exams";
import Spinner from "@/components/shared/spinner";

export default function ExamPage() {
  // ==============================================================================================================
  // && Variables
  const router = useRouter();

  // ==============================================================================================================
  // ??Hookes ===> Fetch Exams
  const { data: payload, error, isLoading } = useExams();

  /*//^ ================================
                                   App => Exam Page Jsx
                                ================================ //*/
  return (
    <>
      {/* //^^ Loader */}
      {isLoading && <Spinner />}
      {/*//!! Error Message */}
      {error && (
        <p className=" text-red-500 text-sm p-3 text-center">{error.message}</p>
      )}

      <div>
        {/* //?? If Response Dont Return Empty [] */}
        {payload && payload?.ExamsList.exams.length > 0 && (
          <>
            <div>
              {payload.ExamsList.exams.map((ex: Exam) => (
                <div
                  onClick={() => router.push(`/exams/${ex.title}_${ex._id}`)}
                  key={ex._id}
                  className=" mt-3 flex justify-between items-center p-3 bg-blue-50 mb-4 cursor-pointer"
                >
                  {/* //^ ===> Exam Details */}
                  <div className="exam-details">
                    <h2 className="text-blue-600 font-semibold">{ex.title}</h2>
                    <p className="text-gray-500 text-sm">
                      {ex.numberOfQuestions} Questions
                    </p>
                  </div>
                  <div className="exam-duration text-gray-500 flex items-center gap-1">
                    <Clock /> <span>Duration : {ex.duration} Minutes</span>
                  </div>
                </div>
              ))}
              <p className="text-center text-gray-500">End of list</p>
            </div>
            {/*//?? If Response Return Empty [] */}
            {payload && payload?.ExamsList.exams.length === 0 && (
              <p className="text-gray-800 p-3 text-center text-xl bg-blue-200 mt-4">
                No Exams Available Now For This Diploma
              </p>
            )}
          </>
        )}
      </div>
    </>
  );
}
