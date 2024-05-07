import { css } from '@emotion/react';

export const globalStyles = css`
    html,
    body {
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        height: 100%;
        min-width: 320px;
    }
    body #__next {
        height: 100%;
    }
`;
