import { Flex, Typography } from 'antd';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { COLORS } from '~variables';
import { useScreenDetector } from '~hooks/responsive';
import { Drumsticks, Drum, Fun } from '~components/ui/icons';
import { BenefitItem } from './benefit-item';
import { BREAKPOINTS } from '~constants/breakpoints';

export const Benefits = () => {
    const { t } = useTranslation();
    const { isMobile, isDesktop, isSmallMobile } = useScreenDetector();

    console.log(isSmallMobile);
    const iconSize = isSmallMobile ? 50 : isMobile ? 80 : 120;

    return (
        <Flex
            style={{
                height: '70%',
                width: '100vw',
                margin: '0 auto',
                background: COLORS.blue,
                padding: '10px 0 100px',
            }}
            vertical
            justify={isMobile ? 'flex-start' : 'space-around'}
            gap={!isDesktop ? 45 : 0}
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
                gap={isMobile || isSmallMobile ? '10px' : '50px'}
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
                <Flex
                    justify="space-around"
                    gap={isMobile || isSmallMobile ? 'small' : 'large'}
                >
                    <BenefitItem
                        text={t('content_benefit_scratch')}
                        icon={
                            <Drumsticks width={iconSize} fill={COLORS.white} />
                        }
                    />
                    <BenefitItem
                        style={{
                            marginTop:
                                isMobile || isSmallMobile ? '30px' : '80px',
                        }}
                        text={t('content_benefit_improve')}
                        icon={<Drum width={iconSize} />}
                    />
                    <BenefitItem
                        text={t('content_benefit_fun')}
                        icon={<Fun width={iconSize} fill={COLORS.white} />}
                    />
                </Flex>
            </Flex>
            <Flex justify="center">
                {/* <motion.div
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <StyledLink href="/application">
                        {t('content_get_started_button')}
                    </StyledLink>
                </motion.div> */}
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
                            {t('content_get_started_button')}
                        </StyledLink>
                    </Flex>
                </motion.div>
            </Flex>
        </Flex>
    );
};

// const StyledLink = styled(Link)`
//     width: 200px;
//     height: 200px;
//     text-align: center;
//     font-size: 24px;
//     color: ${COLORS.blue};
//     background: ${COLORS.white};
//     padding: 20px 30px;
//     border-radius: 8px;
//     &:hover {
//         color: ${COLORS.colorInactive};
//     }
// `;

const StyledLink = styled(Link)`
    // width: 200px;
    // height: 200px;
    text-align: center;
    font-size: 24px;
    color: ${COLORS.black};
    background: 'transparent';
    padding: 20px 30px;
    // border-radius: 8px;
    &:hover {
        color: ${COLORS.colorInactive};
    }

    @media screen and (max-width: ${BREAKPOINTS.smallMobile}) {
        font-size: 12px;
    }
`;
