import { ExamAnswerFormValues } from "@/lib/types/questions";
import { QuizResultResponse } from "@/lib/types/quizz-result";
import { useMutation } from "@tanstack/react-query";
import { sendAnswersToServerAction } from "../_actions/send-answers.action";
// =========================================================================================================
// &&==> Variables
const ERROR_MSG = `Error During Submit Exam`;
// =========================================================================================================

export function useSubmit() {
  const { mutate, isPending } = useMutation<
    QuizResultResponse,
    Error,
    ExamAnswerFormValues
  >({
    mutationFn: async (examAnswers) => {
      const payload = await sendAnswersToServerAction(examAnswers);

      if ("code" in payload) {
        throw new Error(payload?.message || ERROR_MSG);
      }
      return payload;
    },
  });

  return { mutate, isPending };
}
