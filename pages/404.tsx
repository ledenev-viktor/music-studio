import { Flex, Typography } from 'antd';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import { NotFoundIcon } from '~entities/404';
import { AnimatedBorderButton, Icon } from '~shared/ui';

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
                padding: '0 20px',
            }}
        >
            <NotFoundIcon
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
            <Icon
                name="brokenDrumstick"
                size={300}
                height={70}
                style={{ strokeWidth: 1, stroke: '#000' }}
            />
            <Typography.Title level={3}>{t('404_title')}</Typography.Title>
            <AnimatedBorderButton onClick={() => push('/')} />
        </Flex>
    );
};

export async function getStaticProps({ locale }: { locale: string }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, 'common')),
        },
    };
}

export default NotFound;
