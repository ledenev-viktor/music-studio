import React from 'react';
import { Button, Layout, type MenuProps, Menu } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import Image from 'next/image';
import { signOut } from 'next-auth/react';

export const AdminLayout = ({
    children,
    onMenuItemClick,
    menuItems,
}: {
    children?: React.ReactNode;
    onMenuItemClick: MenuProps['onClick'];
    menuItems: Required<Required<MenuProps>['items']>;
}) => {
    return (
        <Layout style={{ height: '100vh', margin: 0, padding: 0 }}>
            <Header
                style={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 1,
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <Image src="/praktika.jpg" alt="logo" width={50} height={50} />
                <Menu
                    onClick={onMenuItemClick}
                    theme="light"
                    mode="horizontal"
                    defaultSelectedKeys={['appointments']}
                    style={{ flex: 1, minWidth: 0 }}
                    items={menuItems}
                />
                <Button onClick={() => signOut({ callbackUrl: '/home' })}>
                    Log out
                </Button>
            </Header>
            <Content style={{ padding: '16px 48px 0' }}>{children}</Content>
        </Layout>
    );
};
