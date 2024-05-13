import { Flex, Layout, Typography } from 'antd';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { COLORS } from 'src/styles/variables';
import { ICONS } from '~components/ui/icons';

export const Footer = () => {
    const { t } = useTranslation();

    return (
        <Layout.Footer
            style={{
                padding: '30px 20px',
                maxWidth: '1200px',
                width: '100%',
                margin: '0 auto',
            }}
        >
            <Flex style={{ display: 'inline-flex' }} vertical>
                <Typography.Text
                    style={{
                        fontSize: '16px',
                        fontWeight: '500',
                        marginBottom: '15px',
                    }}
                >
                    {t('Developers')}
                </Typography.Text>
                <Link
                    style={{
                        color: COLORS.black,
                        fontSize: '16px',
                        fontWeight: '500',
                        marginBottom: '8px',
                    }}
                    href="https://github.com/YuliaKletsova"
                >
                    <Flex align="center">
                        <span style={{ lineHeight: 0 }}>
                            <ICONS.github
                                width="25"
                                style={{ marginRight: '10px' }}
                            />
                        </span>
                        <span>Yulia Kletsova</span>
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
                    <Flex align="center">
                        <span style={{ lineHeight: 0 }}>
                            <ICONS.github
                                width="25"
                                style={{ marginRight: '10px' }}
                            />
                        </span>
                        <span>Ledenev Viktor</span>
                    </Flex>
                </Link>
            </Flex>
        </Layout.Footer>
    );
};
