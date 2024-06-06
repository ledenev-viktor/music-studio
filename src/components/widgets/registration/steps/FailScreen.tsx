import { Flex, Image, Typography } from 'antd';
import { StepWrapper } from './StepWrapper';

export const FailScreen = ({ onComplete }: any) => {
    setTimeout(() => onComplete(), 3000);

    return (
        <StepWrapper>
            <Flex
                vertical
                justify="center"
                align="center"
                style={{ padding: '30px 0' }}
            >
                <Image
                    style={{
                        maxWidth: '200px',
                        padding: '20px',
                        width: '100%',
                    }}
                    alt="fail"
                    src="/fail-icon.svg"
                />
                <Typography.Title level={3} style={{ textAlign: 'center' }}>
                    Something went wrong.
                </Typography.Title>
                <Typography.Title level={4} style={{ margin: 0 }}>
                    Please try submitting your request later.
                </Typography.Title>
            </Flex>
        </StepWrapper>
    );
};
