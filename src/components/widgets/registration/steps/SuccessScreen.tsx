import { Flex, Typography } from 'antd';
import { StepWrapper } from './StepWrapper';

export const SuccessScreen = ({ onComplete }: any) => {
    setTimeout(() => onComplete(), 3000);

    return (
        <StepWrapper>
            <Flex
                vertical
                justify="center"
                align="center"
                style={{ padding: '30px 0' }}
            >
                <Typography.Title level={3} style={{ textAlign: 'center' }}>
                    Request was sent to admin!
                </Typography.Title>
                <Typography.Title level={4} style={{ margin: 0 }}>
                    Admin will contact you soon!
                </Typography.Title>
            </Flex>
        </StepWrapper>
    );
};
