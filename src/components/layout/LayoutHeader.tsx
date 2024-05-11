'use client';
import React from 'react';
import { ConfigProvider, Flex, Layout, Menu } from 'antd';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { COLORS } from 'src/styles/variables';
import { Logo } from '~components/ui/logo';
import { LangSwitch } from '~components/widgets/lang-switch';

export const LayoutHeader = () => {
    const { t } = useTranslation();

    const menuItems = [
        {
            label: (
                <Link href="/home" passHref>
                    {t('header_menu_home')}
                </Link>
            ),
            key: 1,
        },
        {
            label: (
                <Link href="/application" passHref>
                    {t('header_menu_application')}
                </Link>
            ),
            key: 2,
        },
        {
            label: (
                <Link href="/contacts" passHref>
                    {t('header_menu_contacts')}
                </Link>
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
                        horizontalItemHoverBg: `${COLORS.pink}`,
                        horizontalItemSelectedBg: `${COLORS.pink}`,
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
                    <LangSwitch />
                    <Logo
                        link="/"
                        src={'/cat.jpg'}
                        alt="music-studio"
                        width="50"
                        height="50"
                        style={{ marginRight: '5px' }}
                    />
                </Flex>
            </Layout.Header>
        </ConfigProvider>
    );
};
