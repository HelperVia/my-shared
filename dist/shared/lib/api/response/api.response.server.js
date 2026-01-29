/**
 * @copyright 2026 HelperVia / Yaşar Demirtaş
 * @license UNLICENSED - Proprietary and Confidential
 * @build-id 1769715681023-yw99l
 * Unauthorized copying, distribution, or use is strictly prohibited.
 */

import { NextResponse } from "next/server";
export const ApiResponseServer = async (response) => {
    return NextResponse.json(response, {
        status: response?.status,
    });
};
