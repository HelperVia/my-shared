import { NextResponse } from "next/server";

export const ApiResponseServer = async (response: any) => {
  return NextResponse.json(response?.data, {
    status: response?.data?.status || 200,
  });
};
