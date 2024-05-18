import { CSSProperties } from 'react';
import { Button, ButtonProps } from 'antd';
import { useScreenDetector } from '~hooks/responsive';

const BaseButton = ({
    onClick,
    title,
    type,
    style,
    disabled,
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
        >
            {title}
        </Button>
    );
};

export const InterruptButton = (props: Omit<ButtonProps, 'type'>) => (
    <BaseButton type="dashed" {...props} />
);

export const PrimaryButton = (props: Omit<ButtonProps, 'type'>) => (
    <BaseButton type="primary" {...props} />
);
