"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GlobalLoadingProvider;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const api_fetch_1 = require("../../lib/api/api.fetch");
const global_loading_context_1 = require("./global.loading.context");
const navigation_1 = require("next/navigation");
function GlobalLoadingProvider({ children, LoadingComponent, }) {
    const [loading, setLoading] = (0, react_1.useState)(false);
    const [ready, setReady] = (0, react_1.useState)(false);
    const pathname = (0, navigation_1.usePathname)();
    (0, react_1.useEffect)(() => {
        (0, api_fetch_1.decrementActiveRequests)();
    }, [pathname]);
    (0, react_1.useEffect)(() => {
        (0, api_fetch_1.setGlobalLoaderSetter)(setLoading);
        setReady(true);
        (0, api_fetch_1.setUpdateActiveRequest)(0);
        return () => {
            (0, api_fetch_1.setGlobalLoaderSetter)(() => { });
        };
    }, []);
    if (!ready)
        return null;
    return ((0, jsx_runtime_1.jsxs)(global_loading_context_1.GlobalLoadingContext.Provider, { value: loading, children: [loading && (LoadingComponent ?? (0, jsx_runtime_1.jsx)("div", { children: "Loading..." })), children] }));
}
//# sourceMappingURL=global.loading.provider.js.map