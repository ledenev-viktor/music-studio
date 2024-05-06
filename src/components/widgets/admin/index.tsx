'use client';
import React, { Key, useState } from 'react';
import { ConfigProvider, Button, Layout, type MenuProps, Menu } from 'antd';
import { SettingOutlined, TeamOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { Content, Header } from 'antd/es/layout/layout';
import Image from 'next/image';
import { signOut } from 'next-auth/react';
import { useGetImages } from '~hooks/images';
import { Appointments } from './Appointments';
import { Settings } from './Settings';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
    {
        key: 'appointments',
        label: 'Appointments',
        icon: <TeamOutlined />,
    },
    {
        key: 'settings',
        label: 'Settings',
        icon: <SettingOutlined />,
    },
];

export default function AdminApp() {
    const { query } = useRouter();
    const initialTab =
        query.tab && !Array.isArray(query.tab) ? query.tab : 'appointments';
    const [currentTab, setCurrentTab] = useState<Key>(initialTab);
    const onMenuItemClick: MenuProps['onClick'] = (e) => setCurrentTab(e.key);

    const { data: images, isLoading: isLoadingImages } = useGetImages();

    return (
        <ConfigProvider
            theme={{
                components: {
                    Layout: {
                        headerBg: 'white',
                    },
                },
            }}
        >
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
                    <Image
                        src="/praktika.jpg"
                        alt="logo"
                        width={50}
                        height={50}
                    />
                    <Menu
                        onClick={onMenuItemClick}
                        theme="light"
                        mode="horizontal"
                        defaultSelectedKeys={[initialTab]}
                        style={{ flex: 1, minWidth: 0 }}
                        items={items}
                    />
                    <Button onClick={() => signOut({ callbackUrl: '/home' })}>
                        Log out
                    </Button>
                </Header>
                <Content style={{ padding: '16px 48px 0' }}>
                    {currentTab === 'appointments' ? (
                        <Appointments />
                    ) : (
                        <Settings
                            images={images}
                            isLoadingImages={isLoadingImages}
                        />
                    )}
                </Content>
            </Layout>
        </ConfigProvider>
    );
}
