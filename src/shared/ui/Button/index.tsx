import { CSSProperties } from 'react';
import { Button as AntdButton, ButtonProps } from 'antd';
import cn from 'classnames';
import { useScreenDetector } from '~shared/hooks/responsive';
import s from './Button.module.scss';

type BaseButtonProps = {
    style?: CSSProperties;
} & ButtonProps;

const BaseButton = ({
    onClick,
    title,
    type,
    style,
    disabled,
    className,
}: BaseButtonProps) => {
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

export const Button = ({ type, ...props }: BaseButtonProps) => {
    switch (type) {
        case 'primary':
            return <BaseButton type="primary" {...props} />;
        case 'dashed':
            return <BaseButton type="dashed" {...props} />;
        default:
            return <BaseButton type="primary" {...props} />;
    }
};
