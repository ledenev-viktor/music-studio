import { ReactNode } from 'react';
import { Button, CollapseProps, Flex, Typography, theme } from 'antd';
import {
    InstagramOutlined,
    PhoneOutlined,
    EditOutlined,
} from '@ant-design/icons';
import { TFunction } from 'i18next';
import { Appointment } from '~types/appointments';
import { COLORS } from '~variables';
import { Footer, Header } from './common';
import { Telegram } from '~components/ui/icons';
import { APPOINTMENTS_STATUSES_COLORS } from '~constants/status';

export const getCollapsedContent: (
    appointments: Appointment[],
    t: TFunction,
) => CollapseProps['items'] = (appointments, t) => {
    const { token } = theme.useToken();
    const panelStyle: React.CSSProperties = {
        marginBottom: 24,
        background: COLORS.white,
        borderRadius: token.borderRadiusLG,
    };

    return appointments?.map((appointment) => ({
        key: appointment.id,
        label: <Header appointment={appointment} />,
        children: (
            <Flex
                justify="space-between"
                style={{
                    marginLeft: '24px',
                }}
                align="end"
            >
                <Flex vertical>
                    <Flex align="center" gap={20}>
                        <ContactButton
                            href={`https://t.me/${appointment.telegram}`}
                            value={appointment.telegram}
                            icon={<Telegram width={14} fill={COLORS.blue} />}
                        />
                        {appointment.instagram && (
                            <ContactButton
                                href={`https://www.instagram.com/${appointment.instagram}`}
                                value={appointment.instagram}
                                icon={<InstagramOutlined />}
                            />
                        )}
                        {appointment.phone && (
                            <ContactButton
                                href={`https://www.instagram.com/${appointment.phone}`}
                                value={appointment.phone}
                                icon={<PhoneOutlined />}
                            />
                        )}
                    </Flex>
                    <Typography.Text>
                        Comment: {appointment.comment || 'No comment'}
                    </Typography.Text>
                </Flex>
                <Button
                    type="text"
                    style={{ color: COLORS.black }}
                    icon={<EditOutlined />}
                >
                    {t('edit')}
                </Button>
            </Flex>
        ),
        extra: <Footer appointment={appointment} />,
        style: {
            ...panelStyle,
            border: `1px solid ${APPOINTMENTS_STATUSES_COLORS[appointment.status]}`,
        },
    }));
};

const ContactButton = ({
    href,
    value,
    icon,
}: {
    href: string;
    value: string;
    icon: ReactNode;
}) => (
    <Button
        target="_blank"
        type="link"
        rel="noopener noreferrer"
        href={href}
        style={{ color: COLORS.blue, paddingLeft: 0, paddingRight: 0 }}
    >
        <Flex gap={5}>
            {icon}
            <div>{value}</div>
        </Flex>
    </Button>
);
