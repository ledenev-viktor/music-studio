import React from 'react';
import { Spin as SpinAnt } from 'antd';
import cn from 'classnames';
import s from './Spin.module.scss';

export const Spin: React.FC<{
    template?: 'light' | 'dark';
    className?: string;
}> = ({ template = 'light', className, ...otherProps }) => {
    return (
        <SpinAnt
            {...otherProps}
            className={cn(s.spin, className, s[template])}
        />
    );
};
