'use client';
import React from 'react';
import { ConfigProvider, Flex, Layout } from 'antd';
import { COLORS } from '~variables';
import { LangSwitch, Logo } from '~components/ui/home';
import { Menu } from './Menu/Menu';

export const LayoutHeader = () => {
    return (
        <ConfigProvider
            theme={{
                components: {
                    Layout: {
                        headerBg: `${COLORS.blue}`,
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
                    <Flex gap={20} align="center">
                        <Logo
                            link="/"
                            src={'/logo.png'}
                            alt="music-studio"
                            width="50"
                            height="50"
                            style={{ marginRight: '5px' }}
                        />
                        <LangSwitch />
                    </Flex>
                    <Menu />
                </Flex>
            </Layout.Header>
        </ConfigProvider>
    );
};
