import { JSON_HEADER } from "@/lib/constants/api.constant";
import { QUESTIONS } from "@/lib/services/questions-api/questions.api";
import { QuestionsResponse } from "@/lib/types/questions";
import { getToken } from "next-auth/jwt";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const examId = searchParams.get("exam");

  // Guard Clause for Id
  if (!examId) return;
  //  get token
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie: process.env.NODE_ENV === "production",
  });
  const accessToken = token?.accessToken;

  //   Guard Clause
  if (!accessToken) {
    return Response.json({
      message: "No Access Token Available ,Login First",
      code: 401,
    });
  }

  const resp = await fetch(
    `${process.env.BASE_URL}${QUESTIONS.GET_QUESTIONS_PER_EXAM(examId)}`,
    {
      headers: {
        ...JSON_HEADER,
        token: accessToken,
      },
      
    }
  );

  if (!resp.ok) {
    throw new Error("Error During Fetch Questions From Route Handler");
  }

  const payload: QuestionsResponse = await resp.json();

  if (payload.message !== "success") {
    throw new Error(payload.message);
  }

  return Response.json({ payload });
}
