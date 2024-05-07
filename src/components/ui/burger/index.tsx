import styled from '@emotion/styled';
import { Button, ButtonProps } from 'antd';
import { COLORS } from 'src/styles/variables';

const BurgerButtonBase = ({ className, ...props }: ButtonProps) => {
    return (
        <Button className={className} {...props}>
            <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                <g id="hamburger_menu" data-name="hamburger menu">
                    <path
                        d="m9 13h14a1 1 0 0 0 0-2h-14a1 1 0 0 0 0 2z"
                        fill="currentColor"
                    />
                    <path
                        d="m23 15h-14a1 1 0 0 0 0 2h14a1 1 0 0 0 0-2z"
                        fill="currentColor"
                    />
                    <path
                        d="m23 19h-14a1 1 0 0 0 0 2h14a1 1 0 0 0 0-2z"
                        fill="currentColor"
                    />
                </g>
            </svg>
        </Button>
    );
};

export const BurgerButton = styled(BurgerButtonBase)`
    padding: 0;
    border: none;
    width: 50px;
    height: 50px;
    color: ${COLORS.white};
    background: none;
    transition: all 0.3s ease-in-out;

    &.ant-btn-default:not(:disabled):not(.ant-btn-disabled):hover {
        background: none;
        color: ${COLORS.pink};
    }
`;
