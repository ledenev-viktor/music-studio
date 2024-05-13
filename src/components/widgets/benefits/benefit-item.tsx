import { CSSProperties, ReactNode } from 'react';
import { Flex, Typography } from 'antd';
import { COLORS } from 'src/styles/variables';
import { useMobile } from '~hooks/responsive';

type BenefitItemProps = {
    icon: ReactNode;
    text: string;
    style: CSSProperties;
};

export const BenefitItem = ({ icon, text, ...props }: BenefitItemProps) => {
    const isMobile = useMobile();

    return (
        <Flex justify="flex-start" vertical {...props}>
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
                    fontSize: isMobile ? '14px' : '24px',
                    lineHeight: '1.2',
                    textAlign: 'center',
                }}
            >
                {text}
            </Typography.Text>
        </Flex>
    );
};
