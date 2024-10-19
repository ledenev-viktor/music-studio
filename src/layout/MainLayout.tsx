import React, { FC, ReactNode } from 'react';
import { ConfigProvider, Layout } from 'antd';
import { COLORS } from '~variables';
import { CustomMenu } from './CustomMenu';

type RootLayoutProps = {
    children?: ReactNode;
    className?: string;
    contentPadding?: string | number;
};

const MainLayout: FC<RootLayoutProps> = ({ children }) => {
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: COLORS.blue,
                    colorPrimaryActive: COLORS.blue2,
                    colorBorder: COLORS.blue2,
                    colorPrimaryHover: COLORS.blue2,
                },
            }}
        >
            <Layout style={{ minHeight: '100vh' }}>
                <CustomMenu />
                {children}
            </Layout>
        </ConfigProvider>
    );
};

export default MainLayout;
