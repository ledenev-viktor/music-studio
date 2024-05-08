'use client';
import React, { Key, useState } from 'react';
import { ConfigProvider, MenuProps } from 'antd';
import { PictureOutlined, TeamOutlined } from '@ant-design/icons';
import { useGetPicture } from '~hooks/pictures';
import { AdminLayout } from './layout';
import { Appointments } from './Appointments';
import { Pictures } from './PicturesGallery';

type MenuItem = Required<MenuProps>['items'][number];

const menu: { [key: string]: MenuItem } = {
    appointments: {
        key: 'appointments',
        label: 'Appointments',
        icon: <TeamOutlined />,
    },
    pictures: {
        key: 'pictures',
        label: 'Pictures',
        icon: <PictureOutlined />,
    },
};

export default function AdminApp() {
    const items: MenuItem[] = Object.values(menu);
    const initialTab = items?.[0]?.key;
    const [currentTab, setCurrentTab] = useState<Key | undefined>(initialTab);
    const onMenuItemClick: MenuProps['onClick'] = (e) =>
        setCurrentTab(menu[e.key]?.key);

    const { data: pictures } = useGetPicture();

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
            <AdminLayout menuItems={items} onMenuItemClick={onMenuItemClick}>
                {currentTab === initialTab ? (
                    <Appointments />
                ) : (
                    <Pictures pictures={pictures} />
                )}
            </AdminLayout>
        </ConfigProvider>
    );
}
