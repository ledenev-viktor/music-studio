import { Flex, Image, Typography } from 'antd';
import { StepWrapper } from './StepWrapper';

export const StatusScreen = ({
    imgProps: { alt, path },
    title,
    description,
    onComplete,
}: {
    imgProps: { alt: string; path: string };
    title?: string;
    description?: string;
    onComplete: () => void;
}) => {
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
                    alt={alt}
                    src={path}
                />
                {title && (
                    <Typography.Title
                        level={3}
                        style={{ marginTop: 0, textAlign: 'center' }}
                    >
                        {title}
                    </Typography.Title>
                )}
                {description && (
                    <Typography.Title
                        level={4}
                        style={{ margin: 0, textAlign: 'center' }}
                    >
                        {description}
                    </Typography.Title>
                )}
            </Flex>
        </StepWrapper>
    );
};
