import { FC } from 'react';
import { Button as ButtonAntd, ButtonProps } from 'antd';
import styled from '@emotion/styled';

type BtnProps = {
    className?: string;
} & ButtonProps;

const _Btn: FC<BtnProps> = ({ children, className, ...props }) => {
    return (
        <ButtonAntd {...props} className={className}>
            {children}
        </ButtonAntd>
    );
};

export const Btn = styled(_Btn)`
    min-width: 150px;
    min-height: 50px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    box-sizing: border-box;
    margin-left: auto;
`;
