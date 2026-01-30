import { NextResponse } from "next/server";
export interface ApiResponseServerOptionsType {
    cookie: boolean;
}
export declare const ApiResponseServer: (response: any, options: ApiResponseServerOptionsType) => Promise<NextResponse<any>>;
