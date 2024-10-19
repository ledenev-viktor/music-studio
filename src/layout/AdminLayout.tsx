'use client';
import React, { Key, useState } from 'react';
import {
    ConfigProvider,
    Button,
    Layout,
    type MenuProps,
    Menu,
    Flex,
    Spin,
} from 'antd';
import { SettingOutlined, TeamOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { Content, Header } from 'antd/es/layout/layout';
import Image from 'next/image';
import { signOut } from 'next-auth/react';
import { useGetImages } from '~hooks/images';
import { useGetSettings } from '~hooks/settings';
import { Appointments } from '~widgets/admin/Appointments';
import { Settings } from '~widgets/admin/Settings';

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

export default function AdminLayout() {
    const { query } = useRouter();
    const initialTab =
        query.tab && !Array.isArray(query.tab) ? query.tab : 'appointments';
    const [currentTab, setCurrentTab] = useState<Key>(initialTab);
    const onMenuItemClick: MenuProps['onClick'] = (e) => setCurrentTab(e.key);

    const { data: images, isLoading: isLoadingImages } = useGetImages();
    const { data: slidesData, isLoading: isLoadingSlidesData } =
        useGetSettings();

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
            <Layout
                style={{
                    height: '100vh',
                    margin: 0,
                    padding: 0,
                    overflow: 'hidden auto',
                }}
            >
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
                    <Button onClick={() => signOut({ callbackUrl: '/' })}>
                        Log out
                    </Button>
                </Header>
                <Content
                    style={{
                        padding: '16px 48px',
                        boxSizing: 'border-box',
                        minHeight: 'initial',
                    }}
                >
                    {currentTab === 'appointments' ? (
                        <Appointments />
                    ) : (
                        <>
                            {!isLoadingImages || !isLoadingSlidesData ? (
                                <Settings
                                    images={images}
                                    slidesData={slidesData || []}
                                />
                            ) : (
                                <Flex vertical style={{ minHeight: '150px' }}>
                                    <Spin />
                                </Flex>
                            )}
                        </>
                    )}
                </Content>
            </Layout>
        </ConfigProvider>
    );
}
