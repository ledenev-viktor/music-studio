import { Flex } from 'antd';
import Link from 'next/link';
import { InstagramOutlined, PhoneOutlined } from '@ant-design/icons';
import { COLORS } from '~variables';
import { useScreenDetector } from '~hooks/responsive';
import { Telegram, LocationPin } from '~components/ui/icons';

export const SocialsList = () => {
    const { isMobile } = useScreenDetector();
    const items = [
        {
            label: 'Instagram',
            link: 'https://www.instagram.com/praktikastudio/',
            icon: (
                <InstagramOutlined
                    style={{
                        color: COLORS.white,
                        fontSize: '30px',
                    }}
                />
            ),
            key: 1,
        },
        {
            label: 'Praktika Channel',
            link: 'https://t.me/praktikastudio_ch',
            icon: <Telegram width={30} fill={COLORS.white} />,
            key: 2,
        },
        {
            label: 'Praktika Chat',
            link: 'https://t.me/+ACspuFKLISBkMjky',
            icon: <Telegram width={30} fill={COLORS.white} />,
            key: 3,
        },
        {
            label: 'Google Maps',
            link: 'https://goo.gl/maps/mQv4W9rRn1dmJStN6',
            icon: <LocationPin width={40} fill={COLORS.white} />,
            key: 4,
        },
        {
            label: '+995551613311',
            link: 'tel:+995551613311',
            icon: (
                <PhoneOutlined
                    style={{
                        color: COLORS.white,
                        fontSize: '30px',
                    }}
                />
            ),
            key: 5,
        },
    ];

    return (
        <Flex vertical gap={30}>
            {items.map((item) => (
                <Link
                    key={item.label}
                    className="link"
                    href={item.link}
                    style={{
                        fontSize: isMobile ? '20px' : '18px',
                        color: COLORS.white,
                    }}
                >
                    <Flex align="center" gap={10}>
                        {item.icon}
                        {item.label}
                    </Flex>
                </Link>
            ))}
        </Flex>
    );
};
