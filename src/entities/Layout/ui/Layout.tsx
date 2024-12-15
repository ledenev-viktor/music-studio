import { ReactNode } from 'react';
import s from './style.module.scss';

export const Layout = ({
    children,
    header,
    footer,
}: {
    children: ReactNode;
    header?: ReactNode;
    footer?: ReactNode;
}) => {
    return (
        <div className={s.layout}>
            <div className={s.lyaoutInner}>
                {header}
                <div className={s.layoutContent}>{children}</div>
                {footer}
            </div>
        </div>
    );
};
