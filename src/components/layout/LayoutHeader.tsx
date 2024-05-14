'use client';
import React from 'react';
import { ConfigProvider, Flex, Layout, Menu } from 'antd';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import styled from '@emotion/styled';
import { COLORS } from '~variables';
import { LangSwitch, Logo } from '~components/ui/home';

const MenuLabel = styled(Link)`
    font-size: 16px;
`;

export const LayoutHeader = () => {
    const { t } = useTranslation();

    const menuItems = [
        {
            label: (
                <MenuLabel href="/home" passHref>
                    {t('header_menu_home')}
                </MenuLabel>
            ),
            key: 1,
        },
        {
            label: (
                <MenuLabel href="/application" passHref>
                    {t('header_menu_application')}
                </MenuLabel>
            ),
            key: 2,
        },
        {
            label: (
                <MenuLabel href="/contacts" passHref>
                    {t('header_menu_contacts')}
                </MenuLabel>
            ),
            key: 3,
        },
    ];

    return (
        <ConfigProvider
            theme={{
                components: {
                    Layout: {
                        headerBg: `${COLORS.blue}`,
                    },
                    Menu: {
                        itemBg: 'none',
                        itemColor: `${COLORS.white}`,
                        itemHoverColor: `${COLORS.white}`,
                        horizontalItemHoverBg: `${COLORS.blueHovered}`,
                        horizontalItemSelectedBg: `${COLORS.blueHovered}`,
                        horizontalItemSelectedColor: `${COLORS.white}`,
                        activeBarHeight: 0,
                        popupBg: COLORS.blue,
                    },
                },
            }}
        >
            <Layout.Header
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0',
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
                            maxWidth: '450px',
                            width: '100%',
                        }}
                        items={menuItems}
                    />
                    <Flex gap={20} align="center">
                        <LangSwitch />
                        <Logo
                            link="/"
                            src={'/logo.png'}
                            alt="music-studio"
                            width="50"
                            height="50"
                            style={{ marginRight: '5px' }}
                        />
                    </Flex>
                </Flex>
            </Layout.Header>
        </ConfigProvider>
    );
};
