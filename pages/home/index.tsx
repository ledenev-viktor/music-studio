import { Flex, Spin, Typography } from 'antd';
import { useGetEvents } from '~hooks/events';

export default function Page() {
    const { data: events, isLoading: isEventsLoading } = useGetEvents();
    const { Title, Paragraph } = Typography;

    return (
        <Flex
            vertical
            justify="center"
            align="center"
            style={{ padding: '30px' }}
        >
            <Flex justify="start" style={{ width: '100%' }}>
                <Title>Events</Title>
            </Flex>
            {isEventsLoading ? (
                <Spin size="large" />
            ) : (
                <Paragraph>{JSON.stringify(events) || 'empty'}</Paragraph>
            )}
        </Flex>
    );
}
