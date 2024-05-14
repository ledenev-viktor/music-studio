import { css } from '@emotion/react';

export const globalStyles = css`
    html,
    body {
        padding: 0;
        margin: 0;
        min-width: 320px;
        overflow-x: hidden;
        overflow-y: auto;
    }

    nav {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        width: 300px;
    }

    .background {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        width: 300px;
        height: 300px;
        border-bottom-left-radius: 10px;
        background: #fff;
        z-index: 10;
    }

    #button {
        outline: none;
        border: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        cursor: pointer;
        position: absolute;
        top: 9px;
        right: 6px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: transparent;
        z-index: 11;
    }

    ul,
    li {
        margin: 0;
        padding: 0;
    }

    ul {
        padding: 25px;
        position: absolute;
        top: 0px;
        right: 40px;
        width: 230px;
        z-index: 12;
    }

    li {
        list-style: none;
        margin-bottom: 20px;
        display: flex;
        align-items: center;
        cursor: pointer;
    }

    .icon-placeholder {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        flex: 40px 0;
        margin-right: 20px;
    }

    .text-placeholder {
        border-radius: 5px;
        width: 200px;
        height: 20px;
        flex: 1;
    }

    .refresh {
        padding: 10px;
        position: absolute;
        background: rgba(0, 0, 0, 0.4);
        border-radius: 10px;
        width: 20px;
        height: 20px;
        top: 0px;
        right: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }
`;
