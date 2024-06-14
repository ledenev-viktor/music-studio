import { Flex, Typography } from 'antd';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import { BrokenDrumstick, NotFoundSvg } from '~components/ui/icons';
import { AnimatedBorderButton } from '~components/ui/button-animated-border';

const NotFound = () => {
    const { t } = useTranslation();
    const { push } = useRouter();

    return (
        <Flex
            vertical
            align="center"
            justify="center"
            style={{
                width: '100%',
                height: '100vh',
                backgroundImage: 'url(/p.png)',
            }}
        >
            <NotFoundSvg
                svgVariants={{
                    hidden: { rotate: 0 },
                    visible: {
                        rotate: 0,
                        transition: { duration: 1 },
                    },
                }}
                pathVariants={{
                    hidden: {
                        opacity: 0,
                        pathLength: 0,
                    },
                    visible: {
                        opacity: 1,
                        pathLength: 1,
                        transition: {
                            duration: 1,
                            ease: 'easeInOut',
                        },
                    },
                }}
            />
            <BrokenDrumstick
                stroke="#000"
                width={300}
                height={70}
                strokeWidth={1}
            />
            <Typography.Title level={3}>{t('404_title')}</Typography.Title>
            <AnimatedBorderButton onClick={() => push('/')} />
        </Flex>
    );
};

export async function getStaticProps({ locale }: { locale: string }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
        },
    };
}

export default NotFound;
