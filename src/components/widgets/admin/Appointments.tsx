'use client';
import React from 'react';
import { Alert, Card, Empty, Flex, Spin } from 'antd';
import { useGetAppointments } from '~hooks/appointments/useGetAppointments';
import { Appointment } from '~types/appointments';
import { AppointmentRow } from '~components/ui/admin';

export const Appointments = () => {
    const { data, error, isLoading } = useGetAppointments();

    if (isLoading)
        return (
            <Flex align="center" justify="center">
                <Spin size="large" />
            </Flex>
        );

    if (!data?.groupedAppointments)
        return (
            <Empty>
                Seems like no data was fount in database or there were problems
                with connection
            </Empty>
        );

    if (error) {
        return (
            <Flex justify="center" style={{ padding: '0 100px' }}>
                <Alert
                    style={{ color: 'red' }}
                    type="error"
                    message="Something went wrong. Please try again later."
                    description="There was an issue with connection to the database. You can contact developer for further information"
                />
            </Flex>
        );
    }

    return (
        <Flex vertical gap={20}>
            {data?.sortedDatesArray?.map((dateKey: string) => {
                const appointments = data?.groupedAppointments?.[dateKey] || [];
                return (
                    <Card key={dateKey} title={dateKey}>
                        <Flex vertical gap={20}>
                            {appointments.map((appointment: Appointment) => (
                                <AppointmentRow
                                    appointment={appointment}
                                    key={appointment.id}
                                />
                            ))}
                        </Flex>
                    </Card>
                );
            })}
        </Flex>
    );
};
