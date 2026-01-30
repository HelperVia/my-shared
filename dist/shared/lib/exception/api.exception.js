/**
 * @copyright 2026 HelperVia / Yaşar Demirtaş
 * @license UNLICENSED - Proprietary and Confidential
 * @build-id 1769776137054-33s3f
 * Unauthorized copying, distribution, or use is strictly prohibited.
 */

import { NextResponse } from "next/server";
import { toError } from "../../lib/error/error.normalize";
import axios from "axios";
export function ApiException(handler) {
    return async (req, context) => {
        try {
            const response = await handler(req, context);
            return response;
        }
        catch (e) {
            const errorData = e || {};
            if (process.env.NEXT_PUBLIC_DEBUG === "true") {
                errorData.debug =
                    errorData.debug ??
                        JSON.stringify({
                            stack: e?.stack,
                            response: e?.response?.data,
                            status: e?.response?.status,
                            config: e?.config,
                        }, null, 2);
            }
            if (axios.isAxiosError(e)) {
                return NextResponse.json(errorData, {
                    status: errorData?.status ?? 500,
                });
            }
            return NextResponse.json(toError(errorData?.error, e?.status, errorData?.debug), {
                status: errorData?.status ?? 500,
            });
        }
    };
}
