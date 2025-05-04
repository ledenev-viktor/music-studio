import { ReactNode } from 'react';
import cn from 'classnames';
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
                {header && (
                    <div className={cn(s.header)}>
                        <div className={s.headerInner}>{header}</div>
                    </div>
                )}
                <div className={s.layoutContent}>{children}</div>
                {footer && (
                    <div className={s.footer}>
                        <div className={s.footerInner}>{footer}</div>
                    </div>
                )}
            </div>
        </div>
    );
};
