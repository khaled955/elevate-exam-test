import { DIPLOMAS } from "@/lib/services/diploma-api/diploma.api";
import { Subject } from "@/lib/types/diplomas";
import { getToken } from "next-auth/jwt";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const limit = parseInt(searchParams.get("limit") || "6");

  const page = parseInt(searchParams.get("page") || "1");

  //  get token
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie: process.env.NODE_ENV === "production",
  });
  const accessToken = token?.accessToken;

  //   Guard
  if (!accessToken) {
    return Response.json({
      message: "No Access Token Available ,Login First",
      status: 401,
    });
  }

  const payload = await fetch(
    `${process.env.BASE_URL}${DIPLOMAS.GET_ALL_DIPLOMAS(page, limit)}`,
    {
      headers: {
        "content-type": "application/json",
        token: accessToken,
      },
      cache: "no-store",
    }
  );

  const dataPerPage: ApiResponse<PaginatedData<Subject[]>> =
    await payload.json();

  if (dataPerPage.message !== "success") {
    throw new Error(dataPerPage.message);
  }

  return Response.json(dataPerPage);
}
