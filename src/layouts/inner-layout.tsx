'use client';
import React, { FC, ReactNode } from 'react';
import { ConfigProvider, Layout } from 'antd';
import { COLORS } from 'src/styles/variables';
import { Footer } from './footer';
import { Header } from './header';

type InnerLayoutProps = {
    children?: ReactNode;
    className?: string;
};

export const InnerLayout: FC<InnerLayoutProps> = ({ children }) => {
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
                <Header />
                <Layout.Content
                    style={{
                        flexGrow: '2',
                        padding: '50px 20px',
                        maxWidth: '1200px',
                        margin: '0 auto',
                        width: '100%',
                    }}
                >
                    {children}
                </Layout.Content>
                <Footer />
            </Layout>
        </ConfigProvider>
    );
};
