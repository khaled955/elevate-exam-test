import { EXAMS } from "@/lib/services/exams-api/exams.api";
import { Exam } from "@/lib/types/exam";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  // Get Token
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
      status: 401,
    });
  }

  const res = await fetch(`${process.env.BASE_URL}${EXAMS.GET_ALL_Exams}`, {
    headers: {
      "content-type": "application/json",
      token: accessToken,
    },
    cache: "no-store",
  });

  const ExamsList: ApiResponse<PaginatedData<Exam[]>> = await res.json();

  if (ExamsList.message !== "success") {
    throw new Error(ExamsList.message);
  }

  return Response.json({ ExamsList });
}
