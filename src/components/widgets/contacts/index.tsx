import React from 'react';
import { Flex, Typography } from 'antd';
import { useTranslation } from 'next-i18next';
import { SocialsList } from '~components/ui/socials';
import { ICONS } from '~components/ui/icons';

const ContactsPage = () => {
    const { t } = useTranslation();

    const socialItems = [
        {
            label: 'Instagram',
            link: '#',
            icon: ICONS.instagram,
            key: 1,
        },
        {
            label: 'Praktika Channel',
            link: '#',
            icon: ICONS.telegram,
            key: 2,
        },
        {
            label: 'Praktika Chat',
            link: '#',
            icon: ICONS.telegram,
            key: 3,
        },
        {
            label: 'Google Maps',
            link: '#',
            icon: ICONS.location,
            key: 4,
        },
        {
            label: '+995551613311',
            link: 'tel:+995551613311',
            icon: ICONS.call,
            key: 5,
        },
    ];
    return (
        <Flex vertical gap={50}>
            <Flex vertical>
                <Typography.Title>{t('content_studio_name')}</Typography.Title>
                <Typography.Text
                    style={{
                        fontSize: '24px',
                    }}
                >
                    {t('content_studio_address')}
                </Typography.Text>
                <Typography.Text style={{ fontSize: '20px' }}>
                    {t('content_studio_work_hours')}
                </Typography.Text>
            </Flex>
            <SocialsList items={socialItems} />
            <iframe
                title="5 Mikheil Asatiani St"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d744.4220407796702!2d44.74979889506519!3d41.72724740136008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4044731c670393c1%3A0xb19c1409e85cf9f5!2s5%20Mikheil%20Asatiani%20St%2C%20T&#39;bilisi%200171%2C%20Georgia!5e0!3m2!1sen!2sru!4v1715374380181!5m2!1sen!2sru"
                height="400"
                style={{
                    border: 'none',
                    borderRadius: '8px',
                }}
                loading="lazy"
            ></iframe>
        </Flex>
    );
};

export default ContactsPage;
