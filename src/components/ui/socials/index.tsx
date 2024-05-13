import { ElementType } from 'react';
import { Col, Flex, Row } from 'antd';
import Link from 'next/link';
import styled from '@emotion/styled';
import { COLORS } from 'src/styles/variables';
import { useMobile } from '~hooks/responsive';

type SocialItem = {
    label: React.ReactNode;
    link: string;
    key: number;
    icon: ElementType;
};
type SocialsListBaseProps = {
    items: SocialItem[];
    className?: string;
};

export const SocialsListBase = ({
    className,
    items,
    ...props
}: SocialsListBaseProps) => {
    const isMobile = useMobile();

    return (
        <Row
            {...props}
            className={className}
            gutter={isMobile ? [20, 20] : [50, 50]}
        >
            {items.map((item) => (
                <Col span={isMobile ? 24 : 8} key={item.key}>
                    <Link
                        className="link"
                        href={item.link}
                        style={{ fontSize: '24px' }}
                    >
                        <Flex align="center">
                            <span style={{ lineHeight: 0 }}>
                                <item.icon
                                    width={isMobile ? 30 : 50}
                                    style={{
                                        marginRight: '20px',
                                    }}
                                />
                            </span>
                            <span style={{ fontSize: '24px' }}>
                                {item.label}
                            </span>
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
            color: ${COLORS.pink};
        }
    }
`;
