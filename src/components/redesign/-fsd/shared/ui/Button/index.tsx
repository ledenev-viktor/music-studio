import { CSSProperties } from 'react';
import { Button as AntdButton, ButtonProps } from 'antd';
import cn from 'classnames';
import { useScreenDetector } from '~hooks/responsive';
import s from './Button.module.scss';

const BaseButton = ({
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
        <AntdButton
            disabled={disabled}
            type={type}
            onClick={onClick}
            style={{ ...buttonsStyle, ...style }}
            className={cn(s.button, className)}
        >
            {title}
        </AntdButton>
    );
};

export const Button = ({ type, ...props }: { type: 'primary' | 'dashed' }) => {
    switch (type) {
        case 'primary':
            return <BaseButton type="primary" {...props} />;
        case 'dashed':
            return <BaseButton type="dashed" {...props} />;
        default:
            return <BaseButton type="primary" {...props} />;
    }
};
