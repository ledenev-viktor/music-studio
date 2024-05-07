import { Flex, Typography } from 'antd';

export default function Page() {
    const { Title } = Typography;

    return (
        <Flex
            vertical
            justify="center"
            align="center"
            style={{ padding: '30px' }}
        >
            <Flex justify="start" style={{ width: '100%' }}>
                <Title>Application</Title>
            </Flex>
        </Flex>
    );
}
