import { GithubOutlined } from '@ant-design/icons';
import { Flex, Layout, Typography } from 'antd';
import Link from 'next/link';
import { COLORS } from '~variables';
import { useMobile } from '~hooks/responsive';

export const LayoutFooter = () => {
    const isMobile = useMobile();
    return (
        <Layout.Footer
            style={{
                maxWidth: '1200px',
                width: '100%',
                margin: '0 auto',
            }}
        >
            <Flex gap={isMobile ? 10 : 30} align="center" justify="center">
                <Link
                    style={{
                        color: COLORS.black,
                        fontSize: '16px',
                        fontWeight: '500',
                    }}
                    href="https://github.com/YuliaKletsova"
                >
                    <Flex align="center" gap={5}>
                        <GithubOutlined width={25} color={COLORS.black} />
                        <Typography.Paragraph style={{ margin: 0 }}>
                            Yulia Kletsova
                        </Typography.Paragraph>
                    </Flex>
                </Link>
                <Link
                    style={{
                        color: COLORS.black,
                        fontSize: '16px',
                        fontWeight: '500',
                    }}
                    href="https://github.com/ledenev-viktor"
                >
                    <Flex align="center" gap={5}>
                        <GithubOutlined width={25} color={COLORS.black} />
                        <Typography.Paragraph style={{ margin: 0 }}>
                            Ledenev Viktor
                        </Typography.Paragraph>
                    </Flex>
                </Link>
            </Flex>
        </Layout.Footer>
    );
};
