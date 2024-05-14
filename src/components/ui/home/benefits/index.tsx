import { Flex, Typography } from 'antd';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { COLORS } from '~variables';
import { useMobile } from '~hooks/responsive';
import { Drumsticks, Drum, Fun } from '~components/ui/icons';
import { BenefitItem } from './benefit-item';

export const Benefits = () => {
    const { t } = useTranslation();
    const isMobile = useMobile();

    return (
        <Flex
            style={{
                height: '100%',
                width: '100vw',
                margin: '0 auto',
                background: COLORS.blue,
                overflowY: 'scroll',
                padding: '30px 0',
            }}
            vertical
            justify="space-around"
        >
            <Flex
                style={{
                    maxWidth: '960px',
                    width: '100%',
                    boxSizing: 'border-box',
                    margin: '0 auto',
                    color: COLORS.white,
                    flexShrink: 0,
                }}
                vertical
                gap={isMobile ? '15px' : '50px'}
            >
                <Flex vertical gap={0}>
                    <Typography.Title
                        style={{
                            color: COLORS.white,
                            textAlign: 'center',
                            lineHeight: '1.1',
                            marginTop: 0,
                        }}
                        level={isMobile ? 3 : 1}
                    >
                        {t('content_benefits_title')}
                    </Typography.Title>
                    <Typography.Title
                        style={{
                            color: COLORS.white,
                            textAlign: 'center',
                            margin: 0,
                        }}
                        level={4}
                    >
                        {t('content_benefits_description')}
                    </Typography.Title>
                </Flex>
                <Flex justify="space-around" gap={isMobile ? 'small' : 'large'}>
                    <BenefitItem
                        text={t('content_benefit_scratch')}
                        icon={<Drumsticks width={80} fill={COLORS.white} />}
                    />
                    <BenefitItem
                        style={{ marginTop: isMobile ? '50px' : '80px' }}
                        text={t('content_benefit_improve')}
                        icon={<Drum width={80} />}
                    />
                    <BenefitItem
                        text={t('content_benefit_fun')}
                        icon={<Fun width={80} fill={COLORS.white} />}
                    />
                </Flex>
            </Flex>
            <Flex justify="center">
                <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <StyledLink href="/application">
                        {t('content_get_started_button')}
                    </StyledLink>
                </motion.div>
            </Flex>
        </Flex>
    );
};

const StyledLink = styled(Link)`
    width: 200px;
    height: 200px;
    text-align: center;
    font-size: 24px;
    color: ${COLORS.blue};
    background: ${COLORS.white};
    padding: 20px 30px;
    border-radius: 8px;
    &:hover {
        color: ${COLORS.colorInactive};
    }
`;
