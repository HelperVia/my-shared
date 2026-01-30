/**
 * @copyright 2026 HelperVia / Yaşar Demirtaş
 * @license UNLICENSED - Proprietary and Confidential
 * @build-id 1769762196693-ffdjs
 * Unauthorized copying, distribution, or use is strictly prohibited.
 */

import { useState, useEffect } from "react";
import { isMobile as isInitialMobile, isTablet, isDesktop, } from "react-device-detect";
export const useDeviceDetect = () => {
    const [isMobile, setIsMobile] = useState(isInitialMobile);
    useEffect(() => {
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
    return { isMobile, isTablet, isDesktop };
};
