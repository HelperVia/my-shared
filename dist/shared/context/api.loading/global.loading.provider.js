/**
 * @copyright 2026 HelperVia / Yaşar Demirtaş
 * @license UNLICENSED - Proprietary and Confidential
 * @build-id 1769762196692-bm53o5
 * Unauthorized copying, distribution, or use is strictly prohibited.
 */

"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { setGlobalLoaderSetter, setUpdateActiveRequest, decrementActiveRequests, } from "../../lib/api/api.fetch";
import { GlobalLoadingContext } from "./global.loading.context";
import { usePathname } from "next/navigation";
export default function GlobalLoadingProvider({ children, LoadingComponent, }) {
    const [loading, setLoading] = useState(false);
    const [ready, setReady] = useState(false);
    const pathname = usePathname();
    useEffect(() => {
        decrementActiveRequests();
    }, [pathname]);
    useEffect(() => {
        setGlobalLoaderSetter(setLoading);
        setReady(true);
        setUpdateActiveRequest(0);
        return () => {
            setGlobalLoaderSetter(() => { });
        };
    }, []);
    if (!ready)
        return null;
    return (_jsxs(GlobalLoadingContext.Provider, { value: loading, children: [loading && (LoadingComponent ?? _jsx("div", { children: "Loading..." })), children] }));
}
