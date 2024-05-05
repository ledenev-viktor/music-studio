import { FC, ReactNode } from 'react';
import styled from '@emotion/styled';
import { Footer, Header } from '~components/wigets';

type RootLayoutProps = {
    children?: ReactNode;
    className?: string;
};

const RootLayoutBase: FC<RootLayoutProps> = ({ children, className }) => {
    return (
        <div className={className}>
            <Header />
            <main>{children}</main>
            <Footer />
        </div>
    );
};

export const RootLayout = styled(RootLayoutBase)`
    display: flex;
    flex-direction: column;
    height: 100%;

    main {
        flex-grow: 1;
    }
`;
