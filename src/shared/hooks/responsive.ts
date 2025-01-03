import { useEffect, useState } from 'react';
import { BREAKPOINTS } from '~constants/breakpoints';

export const useScreenDetector = () => {
    const [width, setWidth] = useState(window.innerWidth);

    const handleWindowSizeChange = () => {
        setWidth(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);

        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        };
    }, []);

    const isSmallMobile = width <= parseInt(BREAKPOINTS.small, 10);
    const isMobile = width <= parseInt(BREAKPOINTS.medium, 10);
    const isTablet =
        width <= parseInt(BREAKPOINTS.large, 10) &&
        width > parseInt(BREAKPOINTS.medium, 10);
    const isDesktop = width > parseInt(BREAKPOINTS.large, 10);

    return { isSmallMobile, isMobile, isTablet, isDesktop };
};
