"use client";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  AnswerOption,
  ExamAnswerFormValues,
  Question,
} from "@/lib/types/questions";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { redirect } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { QuizResultResponse } from "@/lib/types/quizz-result";
import Spinner from "@/components/shared/spinner";
import { useSubmit } from "../_hooks/use-submit";
import { useQuestions } from "../_hooks/use-questions";
import CounterTimer from "./counter-timer";
import ResultsPopUp from "./results-pop-up";
import MyChart from "./chart";

// =============================================================================================================
// ^^==> Types
type QuestionsProps = {
  
    questions: string;

};
// =============================================================================================================
// && Variables
const defaultValues = {
  answers: [],
  time: 0,
};

// ==============================================================================================================
export default function QuestionsComponent({questions}:QuestionsProps) {
  // =============================================================================================================
  // **===> Guard Clause
  if (!questions || questions.length < 14) redirect("/");
  // ===============================================================================================================
  //??===>States
  const [currentIndex, setCurrentIndex] = useState(0);
  const [finishExam, setFinishExam] = useState(false);
  const [resultInfo, setResultInfo] = useState<null | QuizResultResponse>(null);
  const examId = questions.split("_")[1];

  // ================================================================================================================
  //*===> Hook=================>Mutate
  const { mutate: submitQuizz } = useSubmit();
  //*===> Hook=================>Fetch
  const { error, isLoading, payload } = useQuestions(examId);

  // ==============================================================================================================
  // &&===> Variables

  // ?? Memoize The Questions
  const questionsList: Question[] = useMemo(
    () => payload?.payload?.questions ?? [],
    [payload?.payload?.questions]
  );
  const isThisExamHasQuestions = questionsList?.length > 0;

  const NumberOfQuestions = Math.max(0, (questionsList?.length ?? 0) - 1);

  const totalExamTimePerSeconds =
    isThisExamHasQuestions && payload?.payload?.questions[0].exam.duration;

  const currentQuestion: Question = payload?.payload?.questions[currentIndex];

  const progressSteps = Math.floor((currentIndex / NumberOfQuestions) * 100);

  const lastQuestionIndex = Math.max(0, (questionsList?.length ?? 0) - 1);

  // ==============================================================================================================
  //**===>React Hook Form(RHF)
  const {
    register,
    reset,
    formState: { isSubmitting, isSubmitted },
    setValue,
    handleSubmit,
  } = useForm<ExamAnswerFormValues>({
    defaultValues,
  });

  // ==============================================================================================================
  //**===> Handlers
  const handleLogAnswers: SubmitHandler<ExamAnswerFormValues> = useCallback(
    (data) => {
      submitQuizz(data, {
        onSuccess: (response) => {
          setResultInfo(response);
          // !!==> Remove Timer
          localStorage.removeItem("timeLeft");
          setFinishExam(true);
        },
      });
    },
    [submitQuizz]
  );

  //**===> Memoize Handler As It added In useEffect
  const handleSubmitExam = useCallback(async () => {
    await handleSubmit(handleLogAnswers)();
    setCurrentIndex(questionsList.length);
    localStorage.removeItem("timeLeft");

    setFinishExam(true);
  }, [handleSubmit, questionsList.length, handleLogAnswers]);

  // ??==> Next Btn
  const handleNext = async () => {
    // !!=> Guard Clause In Case Of No Questions
    console.log("1");
    if (lastQuestionIndex < 0) return;

    //  ??=> Submit When Go To Last Question
    if (currentIndex >= lastQuestionIndex) {
      handleSubmitExam();
      return;
    }

    setCurrentIndex((prev) => prev + 1);
  };
  // ??==> Prev Btn
  const handlePrev = () => {
    setCurrentIndex((prev) => prev - 1);
  };

  // ==========================================================================================================
  // ?? ===> Effects
  // ^^===> set Id of Question in defaultvalues before answer
  useEffect(() => {
    if (!questionsList.length) return;

    reset({
      answers: questionsList.map((q) => ({
        questionId: q._id,
        correct: " ",
      })),
      time: 0,
    });
  }, [questionsList, reset]);

  //**===> Set Time Manually
  useEffect(() => {
    if (!questionsList.length) return;

    let seconds = 0;
    //? Timer counter
    let timerId: ReturnType<typeof setInterval>;
    if (!finishExam) {
      timerId = setInterval(() => {
        seconds += 1;
        setValue("time", seconds, { shouldDirty: false });
      }, 1000);
    }

    //!! Clean Up
    return () => clearInterval(timerId);
  }, [questionsList.length, setValue, finishExam]);

  // ===============================================================================================================

  /*//^ ================================
                                   App => Questions Page Jsx
                                ================================ //*/

  return (
    <>
      {/*//*=> Loading */}
      {isLoading && <Spinner />}
      {isSubmitting && <Spinner />}

      {/*//!=> Error */}
      {error && (
        <p className="text-red-500 text-sm text-center">{error.message}</p>
      )}
      {/* //^^==> In Case Of Diploma Has Questions */}
      <div>
        {/*//?=> Exam Questions */}
        {isThisExamHasQuestions && currentQuestion && (
          <div className="bg-white py-4 mt-3 px-2 relative">
            <>
              {/*//&&=> Progress */}
              <p className="text-end text-gray-500 text-sm font-bold">
                Question {currentIndex + 1} of {NumberOfQuestions + 1}
              </p>
              <Progress value={progressSteps} />
              <></>

              {/*//*=> Fields */}
              <form onSubmit={handleSubmit(handleLogAnswers)}>
                <div key={currentQuestion._id} className="mt-4">
                  {/*//?=> Question Title */}
                  <p className="text-blue-600 font-semibold text-2xl mb-2">
                    Q.{currentIndex + 1}-{currentQuestion.question}
                  </p>

                  {currentQuestion.answers.map((answer: AnswerOption) => (
                    //**=> Label For Answers
                    <label
                      key={answer.key}
                      className=" block bg-gray-50 mb-3 py-4 px-2"
                      htmlFor={currentQuestion._id + "-" + answer.key}
                    >
                      {/*//&&=> Input For Answers */}
                      <input
                        {...register(
                          `answers.${currentIndex}.correct` as const
                        )}
                        type="radio"
                        id={currentQuestion._id + "-" + answer.key}
                        value={answer.key}
                      />
                      <span className="ml-2">{answer.answer}</span>
                    </label>
                  ))}
                </div>

                <footer>
                  <div className="action-btn flex justify-between gap-4 items-center">
                    {/*//*=> Previous Button */}
                    <Button
                      className=" grow"
                      disabled={currentIndex === 0}
                      onClick={handlePrev}
                      type="button"
                    >
                      <ChevronLeft /> Previous
                    </Button>

                    {/*//?=> Counter */}
                    <CounterTimer
                      QuestionTime={totalExamTimePerSeconds}
                      onTimeOut={handleSubmitExam}
                    />

                    {/*//^=> Next Button */}
                    <Button
                      className="bg-blue-700 grow"
                      onClick={handleNext}
                      type="button"
                      disabled={isSubmitted}
                    >
                      {currentIndex === NumberOfQuestions ? (
                        isSubmitting ? (
                          "Waiting...."
                        ) : (
                          "Finish"
                        )
                      ) : (
                        <>
                          Next <ChevronRight />
                        </>
                      )}
                    </Button>
                  </div>
                </footer>
              </form>
            </>
          </div>
        )}

        {/* //^^==> In Case Of Diploma Has No Questions */}
        {!isThisExamHasQuestions && !isLoading && (
          <p className="text-center text-gray-600 font-semibold mt-4 p-3">
            Sorry ,No Questions Available For This Exam
          </p>
        )}

        {/*//^^=> Result PopUp */}
        {finishExam && (
          <ResultsPopUp resultInfo={resultInfo} questions={questionsList}>
            <MyChart resultInfo={resultInfo} />
          </ResultsPopUp>
        )}
      </div>
    </>
  );
}
