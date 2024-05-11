import { Flex, Typography } from 'antd';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import styled from '@emotion/styled';
import { COLORS } from 'src/styles/variables';
import { useMobile } from '~hooks/responsive';
import { ICONS } from '~components/ui/icons';
import { BenefitItem } from './benefit-item';

export const Benefits = ({ className }: { className?: string }) => {
    const { t } = useTranslation();
    const isMobile = useMobile();

    return (
        <Flex
            className={className}
            style={{
                width: '100vw',
                position: 'relative',
                left: '50%',
                transform: 'translateX(-50%)',
                padding: isMobile ? '50px 0' : '0 0 25px',
                margin: '0 auto',
                background: COLORS.blue,
            }}
            vertical
        >
            <Flex
                style={{
                    maxWidth: '1240px',
                    width: '100%',
                    boxSizing: 'border-box',
                    margin: '0 auto',
                    padding: '0 20px',
                    color: COLORS.white,
                }}
                vertical
                gap={50}
            >
                <Flex vertical gap={0}>
                    <Typography.Title
                        style={{
                            color: COLORS.white,
                            textAlign: 'center',
                            lineHeight: '1.1',
                        }}
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
                        icon={<ICONS.drumsticks width={isMobile ? 50 : 80} />}
                    />
                    <BenefitItem
                        style={{ marginTop: '50px' }}
                        text={t('content_benefit_improve')}
                        icon={<ICONS.drum width={isMobile ? 50 : 80} />}
                    />
                    <BenefitItem
                        text={t('content_benefit_fun')}
                        icon={<ICONS.fun width={isMobile ? 50 : 80} />}
                    />
                </Flex>
                <StyledLink href="/application">
                    {t('content_get_started_button')}
                </StyledLink>
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
        background: ${COLORS.colorInactive};
        color: ${COLORS.white};
    }
`;
