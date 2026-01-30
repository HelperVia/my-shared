import { NextResponse } from "next/server";

export interface ApiResponseServerOptionsType {
  cookie: boolean;
}
export const ApiResponseServer = async (
  response: any,
  options: ApiResponseServerOptionsType,
) => {
  const { cookie = false } = options;
  const nextResponse = NextResponse.json(response?.data, {
    status: response?.status || 200,
  });

  if (cookie) {
    const setCookies = response.headers?.["set-cookie"];
    if (Array.isArray(setCookies)) {
      setCookies.forEach((cookieStr) => {
        nextResponse.headers.append("Set-Cookie", cookieStr);
      });
    }
  }

  return nextResponse;
};
