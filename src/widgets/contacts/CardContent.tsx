import React from 'react';
import { Flex, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { useScreenDetector } from '~hooks/responsive';
import { COLORS } from '~variables';
import { Socials } from '~components/contacts';

export const CardContent = () => {
    const { isTablet, isDesktop } = useScreenDetector();
    const { t } = useTranslation();

    return (
        <Flex
            vertical
            justify="space-between"
            gap={50}
            style={{
                padding: isDesktop ? '40px' : 0,
                height: '100%',
                overflow: 'scroll',
                marginTop: !isDesktop && !isTablet ? '20px' : 0,
            }}
        >
            {!isDesktop && !isTablet && <Socials isMobile />}
            {(isDesktop || isTablet) && (
                <>
                    <Flex vertical align="baseline" gap="10px">
                        <Typography.Title
                            level={3}
                            style={{ color: COLORS.blue, margin: 0 }}
                        >
                            {t('contacts:workingHours')}
                        </Typography.Title>
                        <Typography.Title
                            level={3}
                            style={{ color: COLORS.blue, margin: 0 }}
                        >
                            {t('contacts:contactUs')}
                        </Typography.Title>
                    </Flex>
                    <Socials />
                    <Flex vertical style={{ height: '100%' }}>
                        <iframe
                            title="5 Mikheil Asatiani St"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d744.4220407796702!2d44.74979889506519!3d41.72724740136008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4044731c670393c1%3A0xb19c1409e85cf9f5!2s5%20Mikheil%20Asatiani%20St%2C%20T&#39;bilisi%200171%2C%20Georgia!5e0!3m2!1sen!2sru!4v1715374380181!5m2!1sen!2sru"
                            style={{
                                border: 'none',
                                height: '100%',
                            }}
                            loading="lazy"
                        />
                    </Flex>
                </>
            )}
        </Flex>
    );
};
