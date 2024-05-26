import {
    ArrowRightOutlined,
    InstagramOutlined,
    PhoneOutlined,
} from '@ant-design/icons';
import { Flex, Typography } from 'antd';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { COLORS } from '~variables';
import { LocationPin, Telegram } from '../icons';

const items = [
    {
        title: 'INSTAGRAM',
        href: 'https://www.instagram.com/praktikastudio/',
        icon: (
            <InstagramOutlined
                style={{
                    color: COLORS.black,
                    fontSize: '20px',
                }}
            />
        ),
    },
    {
        title: 'CHANNEL',
        href: 'https://t.me/praktikastudio_ch',
        icon: <Telegram width={20} fill={COLORS.black} />,
    },
    {
        title: 'CHAT',
        href: 'https://t.me/+ACspuFKLISBkMjky',
        icon: <Telegram width={20} fill={COLORS.black} />,
    },
    {
        title: 'GOOGLE MAPS',
        href: 'https://goo.gl/maps/mQv4W9rRn1dmJStN6',
        icon: <LocationPin width={25} fill={COLORS.black} />,
    },
    {
        title: 'PHONE',
        href: 'tel:+995551613311',
        icon: (
            <PhoneOutlined
                style={{
                    color: COLORS.black,
                    fontSize: '20px',
                }}
            />
        ),
    },
];

const itemStyles = {
    color: COLORS.black,
    background: 'white',
    padding: '0 15px',
    borderRadius: '30px',
    width: '100%',
    height: '60px',
    fontSize: '16px',
};

export const MobileLinks = () => {
    const { t } = useTranslation();

    return (
        <Flex
            vertical
            justify="space-between"
            style={{ height: '100%', minHeight: 320 }}
        >
            <Flex vertical style={{ marginLeft: '15px' }}>
                <Typography.Text
                    style={{
                        fontSize: '20px',
                        marginTop: 0,
                        color: COLORS.white,
                    }}
                >
                    {t('content_studio_address_prefix')}
                </Typography.Text>
                <Typography.Text
                    style={{
                        fontSize: '20px',
                        marginTop: 0,
                        color: COLORS.white,
                    }}
                >
                    {t('content_studio_address')}
                </Typography.Text>
                <Typography.Text
                    style={{ fontSize: '18px', color: COLORS.white }}
                >
                    {t('content_studio_work_hours')}
                </Typography.Text>
            </Flex>
            {items.map((item, i) => (
                <Link key={i} href={item.href} target="_blank">
                    <Flex
                        align="center"
                        justify="space-between"
                        style={itemStyles}
                    >
                        <Flex align="center" gap={5}>
                            {item.icon}
                            {item.title}
                        </Flex>
                        <ArrowRightOutlined />
                    </Flex>
                </Link>
            ))}
        </Flex>
    );
};
