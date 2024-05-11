import { Flex, Typography } from 'antd';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import styled from '@emotion/styled';
import { COLORS } from 'src/styles/variables';
import { useMobile } from '~hooks/responsive';
import { ICONS } from '~components/ui/icons';
import { BenefitItem } from './benefit-item';

const BenefitsBase = ({ className }: { className?: string }) => {
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
                padding: isMobile ? '50px 0' : '87px 0 108px',
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
            >
                <Typography.Title
                    style={{
                        color: COLORS.white,
                        textAlign: 'center',
                        margin: '0 0 30px',
                        lineHeight: '1.1',
                    }}
                >
                    {t('We are a wonderful music studio')}
                </Typography.Title>
                <Typography.Title
                    style={{
                        color: COLORS.white,
                        textAlign: 'center',
                        margin: '0 0 30px',
                    }}
                    level={3}
                >
                    {t('With us you can')}
                </Typography.Title>
                <Flex justify="space-around" gap={isMobile ? 'small' : 'large'}>
                    <BenefitItem
                        style={{ width: '250px' }}
                        text={t('Learn from scratch')}
                        icon={<ICONS.drumsticks width={isMobile ? 50 : 80} />}
                    />
                    <BenefitItem
                        style={{ marginTop: '50px', width: '250px' }}
                        text={t('Improve your skills')}
                        icon={<ICONS.drum width={isMobile ? 50 : 80} />}
                    />
                    <BenefitItem
                        style={{ width: '250px' }}
                        text={t('Have fun')}
                        icon={<ICONS.fun width={isMobile ? 50 : 80} />}
                    />
                </Flex>
                <Link className="link" style={{}} href="/application">
                    {t('Try')}
                </Link>
            </Flex>
        </Flex>
    );
};

export const Benefits = styled(BenefitsBase)`
    .link {
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
            color: ${COLORS.pink};
        }
    }
`;
