import { Flex, Typography } from 'antd';
import { useTranslation } from 'next-i18next';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';
import Link from 'next/link';
import { COLORS } from '~variables';
import { useScreenDetector } from '~hooks/responsive';
import { Drumsticks, Drum, Fun } from '~ui';
import { BenefitItem } from './benefit-item';
import { BREAKPOINTS } from '~constants/breakpoints';

export const Benefits = () => {
    const { t } = useTranslation();
    const { isMobile, isSmallMobile } = useScreenDetector();
    const iconSize = isSmallMobile || isMobile ? '7vh' : '10vh';

    const isMaxMobile = isMobile || isSmallMobile;

    return (
        <Flex
            style={{
                height: 'auto',
                width: '100%',
                margin: '0 auto',
                padding: '30px',
                justifyContent: 'center',
                minHeight: isMaxMobile ? '470px' : '0',
            }}
            vertical
            justify={isMobile ? 'flex-start' : 'space-around'}
        >
            <Flex
                style={{
                    maxWidth: '960px',
                    width: '100%',
                    boxSizing: 'border-box',
                    margin: '0 auto',
                    color: COLORS.white,
                    flexShrink: 0,
                    padding: '0 0 20px',
                }}
                vertical
                gap={isMobile || isSmallMobile ? '1vh' : '2vh'}
            >
                <Flex vertical gap={0}>
                    <Typography.Title
                        style={{
                            color: COLORS.white,
                            textAlign: 'center',
                            lineHeight: '1.1',
                            marginTop: 0,
                        }}
                        level={isMobile || isSmallMobile ? 3 : 1}
                    >
                        {t('home:benefitsTitle')}
                    </Typography.Title>
                    <Typography.Title
                        style={{
                            color: COLORS.white,
                            textAlign: 'center',
                            margin: 0,
                        }}
                        level={4}
                    >
                        {t('home:benefitsDescription')}
                    </Typography.Title>
                </Flex>
                <Flex
                    justify="space-around"
                    gap={isMobile || isSmallMobile ? 'small' : 'large'}
                >
                    <BenefitItem
                        text={t('home:benefitsScratch')}
                        icon={
                            <Drumsticks width={iconSize} fill={COLORS.white} />
                        }
                    />
                    <BenefitItem
                        text={t('home:benefitsImprove')}
                        icon={<Drum width={iconSize} />}
                    />
                    <BenefitItem
                        text={t('home:benefitsFun')}
                        icon={<Fun width={iconSize} fill={COLORS.white} />}
                    />
                </Flex>
            </Flex>
            <Flex justify="center">
                <motion.div
                    style={{
                        background: '#fff',
                        width: isSmallMobile ? '120px' : '200px',
                        height: isSmallMobile ? '30px' : '60px',
                        borderRadius: '8px',
                        scale: 1,
                    }}
                    animate={{
                        scale: 1.2,
                    }}
                    transition={{
                        duration: 0.3,
                        ease: [0, 0.71, 0.2, 1.01],
                        scale: {
                            type: 'spring',
                            damping: 5,
                            repeat: Infinity,
                            repeatDelay: 10,
                        },
                    }}
                >
                    <Flex
                        align="center"
                        justify="center"
                        style={{ width: '100%', height: '100%' }}
                    >
                        <StyledLink href="/application">
                            {t('home:getStartedButton')}
                        </StyledLink>
                    </Flex>
                </motion.div>
            </Flex>
        </Flex>
    );
};

export const StyledLink = styled(Link)`
    text-align: center;
    font-size: 24px;
    color: ${COLORS.black};
    background: 'transparent';
    padding: 20px 30px;
    &:hover {
        color: ${COLORS.colorInactive};
    }

    @media screen and (max-width: ${BREAKPOINTS.smallMobile}) {
        font-size: 12px;
    }
`;
