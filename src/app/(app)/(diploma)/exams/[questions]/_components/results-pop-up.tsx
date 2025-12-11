import Pagination from "@/components/layout/app/pagination";
import Spinner from "@/components/shared/spinner";
import { AnswerOption, Question } from "@/lib/types/questions";
import { QuizResultResponse } from "@/lib/types/quizz-result";
import { ReactNode, useMemo, useState } from "react";

// ============================================================================================================
type ResultsPopUpProps = {
  resultInfo: QuizResultResponse | null;
  questions: Question[];
  children: ReactNode;
};
// ==============================================================================================================
// &&==> Variables
const PAGE_SIZE = 3;
// =============================================================================================================

export default function ResultsPopUp({
  resultInfo,
  questions,
  children,
}: ResultsPopUpProps) {
  // ===========================================================================================================
  //**===> States
  const [currentPage, setCurrentPage] = useState(1);

  // =============================================================================================================
  //&===> Variables
  const totalPages = Math.max(1, Math.ceil(questions.length / PAGE_SIZE));

  // ===========================================================================================================
  //??===> No Of Answers Displayed In One Page
  const paginatedQuestions = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    return questions.slice(start, end);
  }, [questions, currentPage]);

  // ==========================================================================================================

  // ============================================================================================================
  //!!===> Guard Clause
  if (!resultInfo) return <Spinner />;

  // ============================================================================================================

  /*//^ ================================
                                   App => QuestionsPage=>Result Pop Up  Jsx
                                ================================ //*/

  return (
    <>
      <div className="absolute w-full mt-3 grid grid-cols-1 sm:grid-cols-2 min-h-screen bg-gray-50">
        {/*//*==>Chart */}
        <div className="char">{children}</div>
        <div className="result-details grow py-3 space-y-3 pb-32 sm:pb-0">
          <h2 className="text-blue-500 text-xl font-semibold">Results:</h2>

          {/*//*==>Q&A */}
          {paginatedQuestions.map((question: Question) => (
            <div className=" border p-2 space-y-3" key={question._id}>
              <p>{question.question}</p>

              {/*//*==>Answers Field */}
              <div className="flex justify-between">
                {question.answers.map((answer: AnswerOption) => (
                  <p key={answer.answer}>
                    <input
                      readOnly
                      type="radio"
                      checked={question.correct === answer.key}
                    />
                    <span>{answer.answer}</span>
                  </p>
                ))}
              </div>
            </div>
          ))}
          <div></div>
        </div>

        {/*//??===> Pagination */}
        <div className="absolute bottom-0 sm:bottom-6 right-3 z-40 left-[50%] -translate-x-[50]">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            maxVisiblePages={5}
          />
        </div>
      </div>
    </>
  );
}
