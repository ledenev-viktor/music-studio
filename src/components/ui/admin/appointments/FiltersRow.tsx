'use client';
import React from 'react';
import {
    Badge,
    Button,
    ButtonProps,
    Flex,
    Input,
    Select,
    SelectProps,
} from 'antd';
import type { SearchProps } from 'antd/es/input/Search';
import {
    APPOINTMENTS_STATUSES,
    APPOINTMENTS_STATUSES_COLORS,
    AppointmentStatuses,
} from '~constants/status';

export const FiltersRow = ({
    handleSearchChange,
    handleStatusesChange,
    handleSearch,
    handleResetAll,
    searchValue,
    statusValue,
}: {
    handleSearchChange: SearchProps['onChange'];
    handleStatusesChange: SelectProps['onChange'];
    handleSearch: SearchProps['onSearch'];
    handleResetAll: ButtonProps['onClick'];
    searchValue: string;
    statusValue: AppointmentStatuses | '';
}) => {
    const options = Object.values(APPOINTMENTS_STATUSES).map((status) => ({
        label: status,
        value: status,
    }));

    return (
        <Flex
            gap={20}
            style={{
                maxWidth: '1365px',
                width: '100%',
                minWidth: '780px',
            }}
        >
            <Input.Search
                size="large"
                placeholder="input search text"
                allowClear
                value={searchValue}
                onSearch={handleSearch}
                onChange={handleSearchChange}
            />
            <Select
                size="large"
                onChange={handleStatusesChange}
                options={options}
                value={statusValue}
                style={{ width: '200px' }}
                labelRender={({ label, value }) => {
                    const statusColor =
                        APPOINTMENTS_STATUSES_COLORS[
                            value as AppointmentStatuses
                        ];
                    if (!value) return 'Select status';
                    return <Badge color={statusColor} text={label} />;
                }}
                optionRender={(option) => {
                    const statusColor =
                        APPOINTMENTS_STATUSES_COLORS[
                            option?.value as AppointmentStatuses
                        ];
                    return (
                        <Badge
                            color={statusColor}
                            text={option.label}
                            style={{ color: statusColor }}
                        />
                    );
                }}
            />
            <Button size="large" onClick={handleResetAll}>
                Reset All
            </Button>
        </Flex>
    );
};
