import { Flex, Spin, Typography } from 'antd';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { useGetEvents } from '~hooks/events';

export default function Page() {
    const { data: events, isLoading: isEventsLoading } = useGetEvents();
    const { Title, Paragraph } = Typography;
    const { t } = useTranslation();

    return (
        <Flex
            vertical
            justify="center"
            align="center"
            style={{ padding: '30px' }}
        >
            <Flex justify="start" style={{ width: '100%' }}>
                <Title>{t('home page')}</Title>
            </Flex>
            {isEventsLoading ? (
                <Spin size="large" />
            ) : (
                <Paragraph>{JSON.stringify(events) || 'empty'}</Paragraph>
            )}
        </Flex>
    );
}

export async function getStaticProps({ locale }: { locale: string }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
        },
    };
}
