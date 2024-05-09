'use client';
import React, { FC, ReactNode } from 'react';
import { ConfigProvider, Flex, Layout, Menu } from 'antd';
import Link from 'next/link';
import { COLORS } from 'src/styles/variables';
import { Logo } from '~components/ui/logo';
const { Header, Footer, Content } = Layout;

type RootLayoutProps = {
    children?: ReactNode;
    className?: string;
};
const menuItems = [
    {
        label: (
            <Link href="/home" passHref>
                Home
            </Link>
        ),
        key: 1,
    },
    {
        label: (
            <Link href="/application" passHref>
                Application
            </Link>
        ),
        key: 2,
    },
    {
        label: (
            <Link href="/contacts" passHref>
                Contacts
            </Link>
        ),
        key: 3,
    },
];
export const RootLayout: FC<RootLayoutProps> = ({ children }) => {
    return (
        <ConfigProvider
            theme={{
                components: {
                    Layout: {
                        headerBg: `${COLORS.blue}`,
                        headerPadding: '0',
                    },
                    Menu: {
                        itemBg: 'none',
                        itemColor: 'white',
                        itemHoverColor: 'white',
                        horizontalItemHoverBg: 'pink',
                        horizontalItemSelectedBg: 'pink',
                    },
                },
            }}
        >
            <Layout style={{ minHeight: '100vh' }}>
                <Header
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <Flex
                        justify="space-between"
                        align="center"
                        style={{
                            width: '100%',
                            maxWidth: '1200px',
                            margin: '0 auto',
                        }}
                    >
                        <Menu
                            mode="horizontal"
                            style={{
                                minWidth: 0,
                                flex: '1',
                                maxWidth: '300px',
                            }}
                            items={menuItems}
                        />
                        <Logo
                            link="/"
                            src={'/cat.jpg'}
                            alt="music-studio"
                            width="50"
                            height="50"
                            style={{ marginRight: '5px' }}
                        />
                    </Flex>
                </Header>
                <Content style={{ flexGrow: '2' }}>{children}</Content>
                <Footer>Footer</Footer>
            </Layout>
        </ConfigProvider>
    );
};
