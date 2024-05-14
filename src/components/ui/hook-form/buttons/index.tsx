import { CSSProperties } from 'react';
import { Button, ButtonProps } from 'antd';
import { useMobile } from '~hooks/responsive';

const BaseButton = ({
    onClick,
    text,
    type,
    style,
}: {
    onClick: () => void;
    text: string;
    type: ButtonProps['type'];
    style?: CSSProperties;
}) => {
    const isMobile = useMobile();
    const buttonsStyle: CSSProperties = {
        padding: '5px 20px',
        minWidth: isMobile ? '50px' : '100px',
        fontSize: '16px',
        boxSizing: 'content-box',
    };

    return (
        <Button
            type={type}
            onClick={onClick}
            style={{ ...buttonsStyle, ...style }}
        >
            {text}
        </Button>
    );
};

export const InterruptButton = ({
    onClick,
    text,
}: {
    onClick: () => void;
    text: string;
}) => <BaseButton type="dashed" onClick={onClick} text={text} />;

export const PrimaryButton = ({
    onClick,
    text,
}: {
    onClick: () => void;
    text: string;
}) => <BaseButton type="primary" onClick={onClick} text={text} />;
