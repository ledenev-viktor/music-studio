import { Flex, Layout } from 'antd';
import Link from 'next/link';
import { COLORS } from 'src/styles/variables';
import { ICONS } from '~components/ui/icons';

export const LayoutFooter = () => (
    <Layout.Footer
        style={{
            maxWidth: '1200px',
            width: '100%',
            margin: '0 auto',
        }}
    >
        <Flex gap={30} align="center">
            <Link
                style={{
                    color: COLORS.black,
                    fontSize: '16px',
                    fontWeight: '500',
                }}
                href="https://github.com/YuliaKletsova"
            >
                <Flex align="center">
                    <span style={{ lineHeight: 0 }}>
                        <ICONS.github
                            width="25"
                            style={{ marginRight: '5px' }}
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
                            style={{ marginRight: '5px' }}
                        />
                    </span>
                    <span>Ledenev Viktor</span>
                </Flex>
            </Link>
        </Flex>
    </Layout.Footer>
);
