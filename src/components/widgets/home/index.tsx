import { Flex, Spin, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { useGetEvents } from '~hooks/events';
import bannerimg from 'public/mainbg.png';
import { MainBanner } from '../main-banner';

const HomePage = () => {
    const { data: events, isLoading: isEventsLoading } = useGetEvents();
    const { t } = useTranslation();
    return (
        <>
            <MainBanner
                src={bannerimg}
                text="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vero, facere voluptatum corrupti error magnam ducimus ut architecto? A, tempore magni! Ducimus autem eligendi nam ad consequuntur quidem quasi soluta voluptates."
                shortText="Lorem ipsum dolor sit, amet consectetur"
            />
            <Flex
                vertical
                justify="center"
                align="center"
                style={{ padding: '30px' }}
            >
                <Flex justify="start" style={{ width: '100%' }}>
                    <Typography.Title>{t('home page')}</Typography.Title>
                </Flex>
                {isEventsLoading ? (
                    <Spin size="large" />
                ) : (
                    <Typography.Paragraph>
                        {JSON.stringify(events) || 'empty'}
                    </Typography.Paragraph>
                )}
            </Flex>
        </>
    );
};
export default HomePage;
