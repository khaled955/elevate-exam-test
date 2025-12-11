import { ExamAnswerFormValues } from "@/lib/types/questions";
import { QuizResultResponse } from "@/lib/types/quizz-result";
import { useMutation } from "@tanstack/react-query";
import { sendAnswersToServerAction } from "../_actions/send-answers.action";

export function useSubmit() {
  const { mutateAsync, isPending } = useMutation<
    QuizResultResponse,
    Error,
    ExamAnswerFormValues
  >({
    mutationFn: (examAnswers) => sendAnswersToServerAction(examAnswers),
  });

  return { mutateAsync, isPending };
}
