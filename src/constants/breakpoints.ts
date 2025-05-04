import { getCSSVariable } from '~shared/utils/getCSSVariable';

export const BREAKPOINTS = {
    wideLarge: getCSSVariable('--wide-large'),
    mainWidth: getCSSVariable('--main-width'),
    extraLarge: getCSSVariable('--extra-large'),
    xLarge: getCSSVariable('--x-large'),
    large: getCSSVariable('--large'),
    medium: getCSSVariable('--medium'),
    small: getCSSVariable('--small'),
};
