import styled from '@emotion/styled';
import Link from 'next/link';
import { COLORS } from '~variables';
import { BREAKPOINTS } from '~constants/breakpoints';

// const StyledLink = styled(Link)`
//     width: 200px;
//     height: 200px;
//     text-align: center;
//     font-size: 24px;
//     color: ${COLORS.blue};
//     background: ${COLORS.white};
//     padding: 20px 30px;
//     border-radius: 8px;
//     &:hover {
//         color: ${COLORS.colorInactive};
//     }
// `;

export const StyledLink = styled(Link)`
    // width: 200px;
    // height: 200px;
    text-align: center;
    font-size: 24px;
    color: ${COLORS.black};
    background: 'transparent';
    padding: 20px 30px;
    // border-radius: 8px;
    &:hover {
        color: ${COLORS.colorInactive};
    }

    @media screen and (max-width: ${BREAKPOINTS.smallMobile}) {
        font-size: 12px;
    }
`;
