import { CSSProperties } from 'react';
import { Button, ButtonProps } from 'antd';
import styled from '@emotion/styled';
import { useScreenDetector } from '~hooks/responsive';
import { COLORS } from '~variables';

const BaseButtonBase = ({
    onClick,
    title,
    type,
    style,
    disabled,
    className,
}: {
    style?: CSSProperties;
} & ButtonProps) => {
    const { isMobile } = useScreenDetector();
    const buttonsStyle: CSSProperties = {
        padding: '5px 20px',
        minWidth: isMobile ? '50px' : '100px',
        fontSize: '16px',
        boxSizing: 'content-box',
    };

    return (
        <Button
            disabled={disabled}
            type={type}
            onClick={onClick}
            style={{ ...buttonsStyle, ...style }}
            className={className}
        >
            {title}
        </Button>
    );
};

const BaseButton = styled(BaseButtonBase)`
    &.ant-btn-primary {
        background: #f0f3ff;
        color: ${COLORS.blue};
    }
    &.ant-btn-primary:not(:disabled):not(.ant-btn-disabled):hover {
        background: ${COLORS.blue};
    }
    &.ant-btn-dashed {
        border-color: #adadad;
        color: #adadad;
    }
    &.ant-btn-dashed:not(:disabled):not(.ant-btn-disabled):hover {
        border-color: ${COLORS.blue};
        color: ${COLORS.blue};
    }
`;

export const InterruptButton = (props: Omit<ButtonProps, 'type'>) => (
    <BaseButton type="dashed" {...props} />
);

export const PrimaryButton = (props: Omit<ButtonProps, 'type'>) => (
    <BaseButton type="primary" {...props} />
);
