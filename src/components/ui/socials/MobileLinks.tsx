import { ArrowRightOutlined } from '@ant-design/icons';
import { Flex, Typography } from 'antd';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { COLORS } from '~variables';

const items = [
    {
        title: 'INSTAGRAM',
        href: 'https://www.instagram.com/praktikastudio/',
    },
    {
        title: 'CHANNEL',
        href: 'https://t.me/praktikastudio_ch',
    },
    {
        title: 'CHAT',
        href: 'https://t.me/+ACspuFKLISBkMjky',
    },
    {
        title: 'GOOGLE MAPS',
        href: 'https://goo.gl/maps/mQv4W9rRn1dmJStN6',
    },
    {
        title: 'PHONE',
        href: 'tel:+995551613311',
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
    boxShadow:
        'rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px',
};

export const MobileLinks = () => {
    const { t } = useTranslation();

    return (
        <Flex
            vertical
            justify="space-around"
            style={{ height: '100%', minHeight: 320 }}
        >
            <Flex vertical style={{ marginBottom: 15 }}>
                <Typography.Text
                    style={{
                        fontSize: '20px',
                        marginTop: 0,
                    }}
                >
                    {t('content_studio_address_prefix')}
                </Typography.Text>
                <Typography.Text
                    style={{
                        fontSize: '20px',
                        marginTop: 0,
                    }}
                >
                    {t('content_studio_address')}
                </Typography.Text>
                <Typography.Text style={{ fontSize: '18px' }}>
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
                        {item.title}
                        <ArrowRightOutlined />
                    </Flex>
                </Link>
            ))}
        </Flex>
    );
};
