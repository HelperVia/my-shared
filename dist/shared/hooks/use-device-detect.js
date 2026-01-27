"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDeviceDetect = void 0;
const react_1 = require("react");
const react_device_detect_1 = require("react-device-detect");
const useDeviceDetect = () => {
    const [isMobile, setIsMobile] = (0, react_1.useState)(react_device_detect_1.isMobile);
    (0, react_1.useEffect)(() => {
        const mediaQuery = window.matchMedia("(max-width: 767px)");
        const handleChange = (e) => {
            setIsMobile(e.matches);
        };
        setIsMobile(mediaQuery.matches);
        mediaQuery.addEventListener("change", handleChange);
        return () => {
            mediaQuery.removeEventListener("change", handleChange);
        };
    }, []);
    return { isMobile, isTablet: react_device_detect_1.isTablet, isDesktop: react_device_detect_1.isDesktop };
};
exports.useDeviceDetect = useDeviceDetect;
//# sourceMappingURL=use-device-detect.js.map