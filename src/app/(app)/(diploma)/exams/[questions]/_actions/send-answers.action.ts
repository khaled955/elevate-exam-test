"use server";

import { JSON_HEADER } from "@/lib/constants/api.constant";
import { QUESTIONS } from "@/lib/services/questions-api/questions.api";
import { ExamAnswerFormValues } from "@/lib/types/questions";
import { QuizResultResponse } from "@/lib/types/quizz-result";
import { getToken } from "@/lib/utils/manage-token";

export async function sendAnswersToServerAction(
  examAnswers: ExamAnswerFormValues
): Promise<QuizResultResponse> {
  // Get Token
  const jwt = await getToken();
  const token = jwt?.accessToken;

  const resp = await fetch(
    `${process.env.BASE_URL}${QUESTIONS.SEND_TO_CHECK}`,
    {
      headers: {
        ...JSON_HEADER,
        token: token!,
      },
      method: "POST",
      body: JSON.stringify(examAnswers),
    }
  );

  const payload = await resp.json();

  return payload;
}
