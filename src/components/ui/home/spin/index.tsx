import React from 'react';
import { Spin as SpinAnt } from 'antd';
import styled from '@emotion/styled';
import { COLORS } from '~variables';

const SpinBase: React.FC<{
    template?: 'light' | 'dark';
    className?: string;
}> = ({ template, className, ...otherProps }) => {
    return (
        <SpinAnt
            {...otherProps}
            className={`${className} ${template == 'dark' ? 'dark' : 'light'}`}
        />
    );
};

export const Spin = styled(SpinBase)`
    &.dark {
        .ant-spin-dot-item {
            background-color: ${COLORS.black};
        }
    }
    &.light {
        .ant-spin-dot-item {
            background-color: ${COLORS.white};
        }
    }
`;
