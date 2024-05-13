import { CSSProperties } from 'react';
import { Button } from 'antd';
import { COLORS } from '~variables';

const buttonsStyle: CSSProperties = {
    padding: ' 5px 20px',
    minWidth: '50px',
    fontSize: '16px',
    boxSizing: 'content-box',
};

export const InterruptButton = ({
    onClick,
    text,
}: {
    onClick: () => void;
    text: string;
}) => (
    <Button type="dashed" onClick={onClick} style={buttonsStyle}>
        {text}
    </Button>
);

export const PrimaryButton = ({
    onClick,
    text,
}: {
    onClick: () => void;
    text: string;
}) => (
    <Button
        onClick={onClick}
        style={{
            ...buttonsStyle,
            backgroundColor: COLORS.blue,
            color: COLORS.white,
        }}
    >
        {text}
    </Button>
);
