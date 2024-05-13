'use client';
import React from 'react';
import { Badge, Button, Flex } from 'antd';
import Icon, {
    ClockCircleOutlined,
    UserOutlined,
    WarningOutlined,
} from '@ant-design/icons';
import { Appointment } from '~types/appointments';
import { useModal } from '~modals';
import { useUpdateAppointments } from '~hooks/appointments';
import { COLORS } from '~variables';
import {
    APPOINTMENTS_STATUSES,
    APPOINTMENTS_STATUSES_COLORS,
    AppointmentStatusColors,
    AppointmentStatuses,
} from '~constants/status';
import { Telegram } from '~components/ui/icons';

export const Footer = ({ appointment }: { appointment: Appointment }) => {
    const { modal } = useModal();
    const statusColor: AppointmentStatusColors =
        APPOINTMENTS_STATUSES_COLORS[appointment.status];
    const { mutateAsync: updateAppointment } = useUpdateAppointments();

    const onUpdate = (
        appointmentId: Appointment['id'],
        status: AppointmentStatuses,
    ) => {
        modal.confirm({
            icon: <WarningOutlined />,
            title: 'Are you sure you want to perform this action?',
            content:
                'This action cannot be undone. Your data will be permanently changed.',
            onOk: async () => {
                await updateAppointment({
                    appointmentId,
                    status,
                });
            },
        });
    };

    return (
        <>
            {appointment.status !== APPOINTMENTS_STATUSES.PENDING ? (
                <Badge
                    color={statusColor}
                    text={appointment.status}
                    style={{ color: statusColor }}
                />
            ) : (
                <Flex gap={5}>
                    <Button
                        type="text"
                        onClick={() =>
                            onUpdate(
                                appointment.id,
                                APPOINTMENTS_STATUSES.REJECTED,
                            )
                        }
                        size="small"
                    >
                        Reject
                    </Button>
                    <Button
                        type="primary"
                        onClick={() =>
                            onUpdate(
                                appointment.id,
                                APPOINTMENTS_STATUSES.APPROVED,
                            )
                        }
                        size="small"
                    >
                        Approve
                    </Button>
                </Flex>
            )}
        </>
    );
};

export const Header = ({ appointment }: { appointment: Appointment }) => {
    return (
        <Flex justify="space-between">
            <Flex gap={20} align="center">
                <Flex gap={5}>
                    <ClockCircleOutlined />
                    <div>
                        {appointment.startTime} - {appointment.endTime}
                    </div>
                </Flex>
                <Flex gap={5}>
                    <UserOutlined />
                    <div>{appointment.fullName}</div>
                </Flex>
                {appointment.telegram && (
                    <Button
                        target="_blank"
                        type="link"
                        rel="noopener noreferrer"
                        href={`https://t.me/${appointment.telegram}`}
                    >
                        <Flex gap={5}>
                            <Icon
                                component={Telegram}
                                style={{ fill: COLORS.blue, width: 14 }}
                            />
                            <div>{appointment.telegram}</div>
                        </Flex>
                    </Button>
                )}
            </Flex>
        </Flex>
    );
};
