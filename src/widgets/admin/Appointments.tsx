'use client';
import React, { useMemo, useState } from 'react';
import { Alert, ButtonProps, Card, Empty, Flex, SelectProps, Spin } from 'antd';
import type { SearchProps } from 'antd/es/input/Search';
import dayjs from 'dayjs';
import { useGetAppointments } from '~hooks/appointments';
import { filterAppointments } from '~utils/filterAppointments';
import { AppointmentsList, FiltersRow } from '~components/admin';
import { AppointmentStatuses } from '~constants/status';

export const Appointments = () => {
    const [statusFilter, setStatusFilter] = useState<AppointmentStatuses | ''>(
        '',
    );
    const [searchFilter, setSearchFilter] = useState<string>('');
    const { data: initialData, error, isLoading } = useGetAppointments();

    const data = useMemo(
        () => filterAppointments(statusFilter, searchFilter, initialData),
        [initialData, statusFilter, searchFilter],
    );

    if (isLoading)
        return (
            <Flex align="center" justify="center">
                <Spin size="large" />
            </Flex>
        );

    if (error) {
        return (
            <Flex justify="center" style={{ padding: '0 100px' }}>
                <Alert
                    style={{ color: 'red' }}
                    type="error"
                    message="Something went wrong. Please try again later."
                    description="There was an issue with connection to the database. Get in touch with the developer for further information"
                />
            </Flex>
        );
    }

    const onStatusChange: SelectProps['onChange'] = (value) => {
        setStatusFilter(value);
    };
    const onSearch: SearchProps['onSearch'] = (value) => setSearchFilter(value);
    const onSearchFilterChange: SearchProps['onChange'] = (event) =>
        setSearchFilter(event.target.value);

    const onResetAll: ButtonProps['onClick'] = () => {
        setStatusFilter('');
        setSearchFilter('');
    };

    return (
        <Flex vertical gap={20} align="center">
            <FiltersRow
                searchValue={searchFilter}
                handleSearch={onSearch}
                handleSearchChange={onSearchFilterChange}
                handleStatusesChange={onStatusChange}
                handleResetAll={onResetAll}
                statusValue={statusFilter}
            />
            {!data?.length ? (
                <Card
                    key="empty"
                    style={{
                        maxWidth: '1365px',
                        width: '100%',
                        minWidth: '780px',
                    }}
                >
                    <Empty>Seems like no data was fount in database.</Empty>
                </Card>
            ) : (
                <>
                    {data?.map(([dateKey, appointments]) => (
                        <Card
                            key={dateKey}
                            title={dayjs(dateKey).format('DD MMMM dddd')}
                            style={{
                                maxWidth: '1365px',
                                width: '100%',
                                minWidth: '780px',
                            }}
                        >
                            <Flex vertical gap={20}>
                                <AppointmentsList data={appointments} />
                            </Flex>
                        </Card>
                    ))}
                </>
            )}
        </Flex>
    );
};
