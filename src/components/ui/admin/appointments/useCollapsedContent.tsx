import { ReactNode, useState } from 'react';
import { Button, CollapseProps, Flex, Modal, Typography, theme } from 'antd';
import {
    InstagramOutlined,
    PhoneOutlined,
    EditOutlined,
} from '@ant-design/icons';
import { TFunction } from 'i18next';
import { Appointment, EditFormData } from '~types/appointments';
import { COLORS } from '~variables';
import { useEditAppointments } from '~hooks/appointments';
import { Footer, Header } from './common';
import { Telegram } from '~components/ui/icons';
import { APPOINTMENTS_STATUSES_COLORS } from '~constants/status';
import { EditForm } from './EditForm';

export const useCollapsedContent: (
    appointments: Appointment[],
    t: TFunction,
) => CollapseProps['items'] = (appointments, t) => {
    const { token } = theme.useToken();
    const [showModal, setShowModal] = useState(false);
    const panelStyle: React.CSSProperties = {
        marginBottom: 24,
        background: COLORS.white,
        borderRadius: token.borderRadiusLG,
    };
    const { mutateAsync: editAppointment } = useEditAppointments();

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
                        {appointment.telegram && (
                            <ContactButton
                                target="_blank"
                                href={`https://t.me/${appointment.telegram}`}
                                value={appointment.telegram}
                                icon={
                                    <Telegram width={14} fill={COLORS.blue} />
                                }
                            />
                        )}
                        {appointment.instagram && (
                            <ContactButton
                                target="_blank"
                                href={`https://www.instagram.com/${appointment.instagram}`}
                                value={appointment.instagram}
                                icon={<InstagramOutlined />}
                            />
                        )}
                        {appointment.phone && (
                            <ContactButton
                                href={`tel:${appointment.phone}`}
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
                    onClick={() => setShowModal(!showModal)}
                >
                    {t('edit')}
                </Button>

                <Modal
                    title={`Edit appointment for ${appointment.fullName}`}
                    open={showModal}
                    footer={null}
                    closable={false}
                >
                    {showModal && (
                        <EditForm
                            appointment={appointment}
                            onCancel={() => setShowModal(!showModal)}
                            onSubmit={(data: EditFormData) => {
                                editAppointment(data);
                                setShowModal(!showModal);
                            }}
                        />
                    )}
                </Modal>
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
    target,
}: {
    href: string;
    value: string;
    icon: ReactNode;
    target?: string;
}) => (
    <Button
        target={target}
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
