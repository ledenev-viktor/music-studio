import { CSSProperties, ReactNode } from 'react';
import { Typography } from 'antd';
import s from './Label.module.scss';

export const Label = ({
    children,
    style,
}: {
    children: ReactNode;
    style?: CSSProperties;
}) => (
    <Typography.Text className={s.label} style={style}>
        {children}
    </Typography.Text>
);
