import { CSSProperties, ReactNode } from 'react';
import { Flex, Typography } from 'antd';
import { COLORS } from '~variables';
import { useScreenDetector } from '~hooks/responsive';

type BenefitItemProps = {
    icon: ReactNode;
    text: string;
    style?: CSSProperties;
};

export const BenefitItem = ({ icon, text, style }: BenefitItemProps) => {
    const { isMobile, isSmallMobile } = useScreenDetector();

    return (
        <Flex
            justify="flex-start"
            vertical
            style={{ width: '250px', ...style }}
        >
            <Flex
                style={{
                    textAlign: 'center',
                    margin: '0 auto 10px',
                }}
                justify="center"
                vertical
            >
                {icon}
            </Flex>
            <Typography.Text
                style={{
                    color: COLORS.white,
                    fontSize: isMobile || isSmallMobile ? '16px' : '20px',
                    lineHeight: '1.2',
                    textAlign: 'center',
                }}
            >
                {text}
            </Typography.Text>
        </Flex>
    );
};
