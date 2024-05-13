import { Flex, Typography } from 'antd';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import Icon from '@ant-design/icons';
import { COLORS } from '~variables';
import { useMobile } from '~hooks/responsive';
import { Drumsticks, Drum, Fun } from '~components/ui/icons';
import { BenefitItem } from './benefit-item';
import { MOBILE_SIZE, LAPTOP_SIZE } from '~constants/breakpoints';

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
            }}
            vertical
            justify="space-around"
        >
            <Flex
                style={{
                    maxWidth: '1240px',
                    width: '100%',
                    boxSizing: 'border-box',
                    margin: '0 auto',
                    color: COLORS.white,
                    flexShrink: 0,
                }}
                vertical
                gap={isMobile ? 'small' : 'large'}
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
                        icon={
                            <Icon
                                component={Drumsticks}
                                style={{
                                    width: isMobile ? MOBILE_SIZE : LAPTOP_SIZE,
                                    fill: COLORS.white,
                                }}
                            />
                        }
                    />
                    <BenefitItem
                        style={{ marginTop: isMobile ? '30px' : '50px' }}
                        text={t('content_benefit_improve')}
                        icon={
                            <Icon
                                component={Drum}
                                style={{
                                    width: isMobile ? MOBILE_SIZE : LAPTOP_SIZE,
                                    fill: COLORS.white,
                                }}
                            />
                        }
                    />
                    <BenefitItem
                        text={t('content_benefit_fun')}
                        icon={
                            <Icon
                                component={Fun}
                                style={{
                                    width: isMobile ? MOBILE_SIZE : LAPTOP_SIZE,
                                    fill: COLORS.white,
                                }}
                            />
                        }
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
    min-width: 200px;
    max-width: 350px;
    text-align: center;
    font-size: 24px;
    color: ${COLORS.blue};
    background: ${COLORS.white};
    padding: 10px 15px 12px;
    border-radius: 8px;
    margin: 55px auto 0;
    &:hover {
        color: ${COLORS.colorInactive};
    }
`;
