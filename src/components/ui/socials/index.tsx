import { Col, Flex, Row } from 'antd';
import Link from 'next/link';
import styled from '@emotion/styled';
import Icon, { InstagramOutlined, PhoneOutlined } from '@ant-design/icons';
import { COLORS } from '~variables';
import { useMobile } from '~hooks/responsive';
import { Telegram, LocationPin } from '~components/ui/icons';
import { LAPTOP_SIZE, MOBILE_SIZE } from '~constants/breakpoints';

export const SocialsListBase = ({ className }: { className?: string }) => {
    const isMobile = useMobile();

    const items = [
        {
            label: 'Instagram',
            link: '#',
            icon: (
                <InstagramOutlined
                    style={{
                        color: COLORS.blue,
                        fontSize: isMobile ? MOBILE_SIZE : LAPTOP_SIZE,
                    }}
                />
            ),
            key: 1,
        },
        {
            label: 'Praktika Channel',
            link: '#',
            icon: (
                <Icon
                    component={Telegram}
                    style={{
                        fill: COLORS.blue,
                        width: isMobile ? MOBILE_SIZE : LAPTOP_SIZE,
                    }}
                />
            ),
            key: 2,
        },
        {
            label: 'Praktika Chat',
            link: '#',
            icon: (
                <Icon
                    component={Telegram}
                    style={{
                        fill: COLORS.blue,
                        width: isMobile ? MOBILE_SIZE : LAPTOP_SIZE,
                    }}
                />
            ),
            key: 3,
        },
        {
            label: 'Google Maps',
            link: '#',
            icon: (
                <Icon
                    component={LocationPin}
                    style={{
                        fill: COLORS.blue,
                        width: isMobile ? MOBILE_SIZE : LAPTOP_SIZE,
                    }}
                />
            ),
            key: 4,
        },
        {
            label: '+995551613311',
            link: 'tel:+995551613311',
            icon: (
                <PhoneOutlined
                    style={{
                        color: COLORS.blue,
                        fontSize: isMobile ? MOBILE_SIZE : LAPTOP_SIZE,
                    }}
                />
            ),
            key: 5,
        },
    ];

    return (
        <Row className={className} gutter={isMobile ? [20, 30] : [50, 50]}>
            {items.map((item) => (
                <Col span={isMobile ? 24 : 8} key={item.key}>
                    <Link
                        className="link"
                        href={item.link}
                        style={{ fontSize: '24px' }}
                    >
                        <Flex align="center" gap={10}>
                            {item.icon}
                            {item.label}
                        </Flex>
                    </Link>
                </Col>
            ))}
        </Row>
    );
};

export const SocialsList = styled(SocialsListBase)`
    .link {
        color: ${COLORS.blue};
        &:hover {
            color: ${COLORS.colorInactive};
        }
    }
`;
