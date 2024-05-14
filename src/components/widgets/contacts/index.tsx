import React from 'react';
import { ConfigProvider, Flex, Typography } from 'antd';
import { useTranslation } from 'next-i18next';
import { useMobile } from '~hooks/responsive';
import { COLORS } from '~variables';
import { SocialsList } from '~components/ui/socials';
import { Logo } from '~components/ui/home';

const ContactsPage = () => {
    const isMobile = useMobile();
    const { t } = useTranslation();

    return (
        <Flex
            gap={50}
            style={{
                height: '100vh',
                background: COLORS.blue,
                padding: '5% 15%',
            }}
        >
            <Flex vertical gap={50}>
                <Logo
                    link="/"
                    src={'/logo.png'}
                    alt="music-studio"
                    width="100"
                    height="100"
                />
                <Flex vertical>
                    <ConfigProvider
                        theme={{
                            components: {
                                Typography: {
                                    colorText: COLORS.white,
                                    colorTextHeading: COLORS.white,
                                },
                            },
                        }}
                    >
                        <Typography.Title style={{ margin: 0 }}>
                            {t('content_studio_name')}
                        </Typography.Title>
                        <Typography.Text
                            style={{
                                fontSize: '24px',
                                marginTop: 0,
                            }}
                        >
                            {t('content_studio_address')}
                        </Typography.Text>
                        <Typography.Text style={{ fontSize: '20px' }}>
                            {t('content_studio_work_hours')}
                        </Typography.Text>
                    </ConfigProvider>
                </Flex>
                <SocialsList />
            </Flex>
            {!isMobile && (
                <iframe
                    title="5 Mikheil Asatiani St"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d744.4220407796702!2d44.74979889506519!3d41.72724740136008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4044731c670393c1%3A0xb19c1409e85cf9f5!2s5%20Mikheil%20Asatiani%20St%2C%20T&#39;bilisi%200171%2C%20Georgia!5e0!3m2!1sen!2sru!4v1715374380181!5m2!1sen!2sru"
                    height="100%"
                    width="100%"
                    style={{
                        border: 'none',
                        borderRadius: '8px',
                    }}
                    loading="lazy"
                ></iframe>
            )}
        </Flex>
    );
};

export default ContactsPage;
