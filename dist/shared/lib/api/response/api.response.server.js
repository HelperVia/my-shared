import { NextResponse } from "next/server";
export const ApiResponseServer = async (response) => {
    return NextResponse.json(response, {
        status: response?.status,
    });
};
