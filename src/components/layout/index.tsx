import React, { FC, ReactNode } from 'react';
import { ConfigProvider, Layout } from 'antd';
import { COLORS } from 'src/styles/variables';
import { LayoutFooter } from './LayoutFooter';
import { LayoutHeader } from './LayoutHeader';

type RootLayoutProps = {
    children?: ReactNode;
    className?: string;
    contentPadding?: string | number;
};

const MainLayout: FC<RootLayoutProps> = ({
    children,
    contentPadding = '50px 20px',
}) => {
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
                <Layout.Content
                    style={{
                        flexGrow: '2',
                        padding: contentPadding,
                        maxWidth: '1200px',
                        margin: '0 auto',
                        width: '100%',
                    }}
                >
                    {children}
                </Layout.Content>
                <LayoutFooter />
            </Layout>
        </ConfigProvider>
    );
};

export default MainLayout;
