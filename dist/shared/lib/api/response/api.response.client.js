/**
 * @copyright 2026 HelperVia / Yaşar Demirtaş
 * @license UNLICENSED - Proprietary and Confidential
 * @build-id 1769762196696-vfd0f
 * Unauthorized copying, distribution, or use is strictly prohibited.
 */

const defaultErrorMessage = "Network or parsing error";
export const ApiResponseClient = async (response) => {
    try {
        const data = await response.json();
        if (data?.success) {
            return {
                ok: true,
                data: data?.data || {},
                message: data?.message || "",
                status: data?.status,
                error: null,
            };
        }
        let errorMessage = "";
        if (!data?.success) {
            if (data?.error) {
                if (typeof data.error === "string") {
                    errorMessage = data.error;
                }
                else if (typeof data.error === "object") {
                    const errors = Object.values(data.error).flat();
                    errorMessage = errors[0] || defaultErrorMessage;
                }
            }
            else if (data?.message) {
                errorMessage = data.message;
            }
        }
        return {
            ok: false,
            error: errorMessage,
            status: data?.status,
        };
    }
    catch (e) {
        if (process.env.NEXT_PUBLIC_DEBUG === "true") {
            console.log(e);
        }
        return {
            ok: false,
            error: defaultErrorMessage,
            status: 500,
        };
    }
};
