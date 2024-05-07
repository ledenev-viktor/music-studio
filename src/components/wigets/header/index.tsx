import { useState } from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';
import { Flex, Typography } from 'antd';
import { baseContainerMixin } from 'src/styles/mixins';
import { COLORS } from 'src/styles/variables';
import { useMobile } from '~hooks/responsive';
import logoimg from 'public/cat.jpg';
import { Menu } from '~components/ui/menu';
import { BurgerButton } from '~components/ui/burger';
import { AdaptiveSidebar } from '~components/ui/adaptive-sidebar';
import { Logo } from '~components/ui/logo';
import { SocialsList } from '~components/ui/socials';
import { ICONS } from '~components/ui/icons';

type HeaderBaseProps = {
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

const socialItems = [
    {
        label: (
            <Link href="#" target="_blank" passHref>
                Instagram
            </Link>
        ),
        key: 1,
        icon: <ICONS.instagram />,
    },
    {
        label: (
            <Link href="#" target="_blank" passHref>
                Praktika Channel
            </Link>
        ),
        key: 2,
        icon: <ICONS.telegram />,
    },
    {
        label: (
            <Link href="#" target="_blank" passHref>
                Praktika Chat
            </Link>
        ),
        key: 3,
        icon: <ICONS.telegram />,
    },
    {
        label: (
            <Link href="#" target="_blank" passHref>
                Google Maps
            </Link>
        ),
        key: 4,
        icon: <ICONS.location />,
    },
    {
        label: (
            <Link href="tel:+995551613311" target="_blank" passHref>
                +995551613311
            </Link>
        ),
        key: 5,
        icon: <ICONS.call />,
    },
];

const HeaderBase = ({ className }: HeaderBaseProps) => {
    const isMobile = useMobile();
    const [openSidebar, setOpenSidebar] = useState(false);
    const { Text } = Typography;

    return (
        <div className={className}>
            <div className="header-inner">
                <div className="header-logo">
                    <Logo
                        link="/"
                        src={logoimg}
                        alt="music-studio"
                        width="50"
                        height="50"
                    />
                </div>
                <div className="header-menu">
                    {isMobile ? (
                        <>
                            <BurgerButton
                                onClick={() => setOpenSidebar(true)}
                            />
                            <AdaptiveSidebar
                                placement="left"
                                open={openSidebar}
                                onClose={() => setOpenSidebar(false)}
                                extra={
                                    <Logo
                                        link="/"
                                        src={logoimg}
                                        alt="music-studio"
                                        width="50"
                                        height="50"
                                    />
                                }
                            >
                                <Flex style={{ padding: '0 20px' }} vertical>
                                    <Text strong>Music studio</Text>
                                    <Text>5 Mikheil Asatiani St, Tbilisi</Text>
                                    <Text>11.00 - 23.00</Text>
                                </Flex>
                                <Menu
                                    style={{ marginTop: '25px' }}
                                    mode="vertical"
                                    items={menuItems}
                                    onClick={() => setOpenSidebar(false)}
                                />
                                <SocialsList
                                    mode="vertical"
                                    items={socialItems}
                                />
                            </AdaptiveSidebar>
                        </>
                    ) : (
                        <Menu mode="horizontal" items={menuItems} />
                    )}
                </div>
            </div>
        </div>
    );
};

export const Header = styled(HeaderBase)`
    min-height: 80px;
    background: ${COLORS.blue};
    .header {
        &-inner {
            ${baseContainerMixin}
            height: 100%;
            display: flex;
            align-items: center;
            padding: 10px 20px;
        }

        &-logo {
            flex-shrink: 0;
        }
        &-menu {
            flex-grow: 2;
            text-align: right;
        }
    }
`;
