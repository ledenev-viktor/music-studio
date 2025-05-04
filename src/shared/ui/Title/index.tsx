import { ReactNode } from 'react';
import s from './Title.module.scss';

export const Title = ({ children }: { children: ReactNode }) => {
    return <h2 className={s.title}>{children}</h2>;
};
