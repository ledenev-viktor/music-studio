/* eslint-disable react/prop-types */
import React, { ReactNode, useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { Badge, Flex, Tag, Typography } from 'antd';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';
import { COLORS } from '~variables';
import { DaysWithSlots } from '~types/days';
import {
    CALENDAR_STATUSES_COLORS,
    CalendarStatuses,
} from '~constants/calendar';
import { CalendarHeader } from './CalendarHeader';

const CalendarBase = ({
    className,
    days,
    onDayChange,
    onWeekChange,
    isLoadingSlots,
}: {
    className?: string;
    days: DaysWithSlots;
    onDayChange: (value: string) => void;
    onWeekChange: (start: Dayjs, end: Dayjs) => void;
    isLoadingSlots: boolean;
}) => {
    const today = dayjs();
    const [selected, setSelected] = useState<Dayjs>();
    const [current, setCurrent] = useState<Dayjs>(today);
    const [startMonth, setStartMonth] = useState<string>(
        current.startOf('week').format('MMMM'),
    );
    const [endMonth, setEndMonth] = useState<string>(
        current.endOf('week').format('MMMM'),
    );

    useEffect(() => {
        setStartMonth(current.format('MMMM'));
        setEndMonth(current.add(6, 'day').format('MMMM'));
    }, [current]);

    const startOfCurrentWeek = current;
    const daysOfWeek = Array.from({ length: 7 }, (_, i) =>
        startOfCurrentWeek.add(i, 'day'),
    );

    const handleDayClick = (day: Dayjs) => {
        setSelected(day);
        onDayChange(day.format('YYYY-MM-DD'));
    };

    const CalendarItemWrapper = ({
        children,
        day,
    }: {
        children: ReactNode;
        day: Dayjs;
    }) => (
        <motion.div
            key={day.toString()}
            whileHover={{
                scale: 1.1,
            }}
            whileTap={{
                scale: 0.9,
            }}
            style={{ width: '100%' }}
        >
            <Flex vertical style={{ width: '100%' }}>
                <Tag.CheckableTag
                    style={{
                        width: '100%',
                        color: 'rgba(0, 0, 0, 0.25)',
                        padding: '4px 8px',
                    }}
                    checked={
                        selected?.format('YYYY-MM-DD') ===
                        day.format('YYYY-MM-DD')
                    }
                    onChange={() => handleDayClick(day)}
                >
                    {children}
                </Tag.CheckableTag>
            </Flex>
        </motion.div>
    );

    const getColorForStatus = (day: Dayjs) => {
        if (isLoadingSlots) return CALENDAR_STATUSES_COLORS.CALCULATING;

        return (
            CALENDAR_STATUSES_COLORS[
                days[day.format('YYYY-MM-DD')]?.status as CalendarStatuses
            ] || CALENDAR_STATUSES_COLORS.FREE
        );
    };

    return (
        <Flex vertical style={{ width: '100%' }} gap={20} className={className}>
            <CalendarHeader
                current={current}
                today={today}
                setCurrent={setCurrent}
                startMonth={startMonth}
                endMonth={endMonth}
                onWeekChange={onWeekChange}
            />
            <Flex justify="space-between" gap={5}>
                {daysOfWeek.map((day: Dayjs) => (
                    <CalendarItemWrapper key={day.toString()} day={day}>
                        <Flex
                            justify="center"
                            style={{
                                padding: '0 0 4px 0',
                            }}
                        >
                            {day.format('dd')}
                        </Flex>
                        <Flex vertical gap={5} align="center">
                            <Typography.Text>
                                {day.format('DD')}
                            </Typography.Text>
                            <Badge color={getColorForStatus(day)} />
                        </Flex>
                    </CalendarItemWrapper>
                ))}
            </Flex>
        </Flex>
    );
};

export const Calendar = styled(CalendarBase)`
    .ant-tag {
        width: 100%;
        text-align: center;
        border-radius: 10px;
        padding: 10px 8px;
        box-sizing: border-box;
        line-height: 1;
        font-size: 16px;
        color: #000;
        background-color: ${COLORS.white};
        border: 1px solid ${COLORS.lightGrey};

        &:hover {
            background-color: ${COLORS.white};
            border: 1px solid ${COLORS.blue};
            color: #000;
        }

        &.ant-tag-checkable-checked {
            background-color: ${COLORS.white};
            border: 1px solid ${COLORS.blue};
            color: #000;
        }
    }
`;
