import { css } from '@emotion/react';

export const globalStyles = css`
    body {
        --white: #fafafa;
        --background: var(--white);
        --accent: rgba(18, 18, 18, 0.8);
        //rgba(94, 99, 232, 0.9);
        margin: 0;
        padding: 0;
        background-color: var(--background);
        overflow: hidden;
        min-height: 100vh;
        min-width: 320px;
    }

    * {
        font-family: sofia-pro, sans-serif;
        font-weight: 400;
        font-style: normal;
        -webkit-font-smoothing: antialiased;
    }

    .refresh {
        padding: 5px;
        position: absolute;
        border: 1px dotted var(--accent);
        border-radius: 5px;
        width: 20px;
        height: 20px;
        top: 10px;
        right: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }

    .refresh path {
        fill: var(--accent);
    }

    .box {
        width: 150px;
        height: 150px;
        border-radius: 50%;
        background: var(--accent);
        margin: 0;
    }

    .clientMenu {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        width: 400px;
        background: var(--accent);
        transform: translateX(120%);
        will-change: transform;
        z-index: 10;
    }

    .clientMenuUl {
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding: 15px;
        z-index: 11;
    }

    .clientMenuLi {
        color: var(--background);
        display: block;
        transform-origin: 300px 50%;
        font-weight: bold;
        font-size: 48px;
        padding: 10px;
        will-change: transform, opacity, filter;
    }

    .clientMenuUl,
    .clientMenuLi {
        list-style: none;
        margin: 0;
    }

    #button {
        outline: none;
        border: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        cursor: pointer;
        position: absolute;
        top: 18px;
        right: 15px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--accent);
        padding: 10px;
        z-index: 11;
    }

    button path {
        fill: var(--background);
    }
`;
