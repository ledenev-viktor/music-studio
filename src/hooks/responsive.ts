import { useMediaQuery } from 'react-responsive';
import { BREAKPOINTS } from '~constants/breakpoints';

export const useMobile = () =>
    useMediaQuery({ query: `(max-width: ${BREAKPOINTS.mobile})` });
