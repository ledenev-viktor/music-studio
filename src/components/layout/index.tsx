import React, { FC, ReactNode } from 'react';
import { ConfigProvider, Layout } from 'antd';
import { COLORS } from '~variables';
import { LayoutFooter } from './LayoutFooter';
import { LayoutHeader } from './LayoutHeader';

type RootLayoutProps = {
    children?: ReactNode;
    className?: string;
    contentPadding?: string | number;
};

const MainLayout: FC<RootLayoutProps> = ({ children }) => {
    return (
        <ConfigProvider
            theme={{
                components: {
                    Layout: {
                        headerBg: `${COLORS.blue}`,
                        bodyBg: `${COLORS.white}`,
                        footerBg: `${COLORS.white}`,
                    },
                },
            }}
        >
            <Layout style={{ minHeight: '100vh' }}>
                <LayoutHeader />
                {children}
                <LayoutFooter />
            </Layout>
        </ConfigProvider>
    );
};

export default MainLayout;
