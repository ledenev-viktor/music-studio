/* eslint-disable react/prop-types */
import React, { ReactNode, useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { Badge, Flex, Tag, Typography } from 'antd';
import { motion } from 'framer-motion';
import cn from 'classnames';
import { DaysWithSlots } from '~types/days';
import { CalendarHeader } from './CalendarHeader';
import {
    CALENDAR_STATUSES_COLORS,
    CalendarStatuses,
} from '~constants/calendar';
import s from './Calendar.module.scss';

export const Calendar = ({
    className,
    days,
    onDayChange,
    onWeekChange,
    isLoadingSlots,
    date,
    weekStartDay,
}: {
    className?: string;
    days: DaysWithSlots;
    onDayChange: (value: string) => void;
    onWeekChange: (start: Dayjs, end: Dayjs) => void;
    isLoadingSlots: boolean;
    date?: string;
    weekStartDay?: Dayjs;
}) => {
    const today = dayjs();
    const [selected, setSelected] = useState<Dayjs | undefined>(
        date ? dayjs(date) : today,
    );
    // is used as basic for calculating dates
    const [current, setCurrent] = useState<Dayjs>(
        weekStartDay ? weekStartDay : today,
    );

    // those states are needed to display month names
    const [startMonth, setStartMonth] = useState<string>(
        current.startOf('week').format('MMMM'),
    );
    const [endMonth, setEndMonth] = useState<string>(
        current.endOf('week').format('MMMM'),
    );

    // update the month
    useEffect(() => {
        setStartMonth(current.format('MMMM'));
        setEndMonth(current.add(6, 'day').format('MMMM'));
    }, [current]);

    const startOfCurrentWeek = weekStartDay ? weekStartDay : current;
    const daysOfWeek = Array.from({ length: 7 }, (_, i) =>
        startOfCurrentWeek.add(i, 'day'),
    );

    // callback that works when you choose a date
    const handleDayClick = (day: Dayjs) => {
        setSelected(day);
        onDayChange(day.format('YYYY-MM-DD'));
    };

    // just a wrapper for tag the Tag component to have smooth hover animation
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
            <Flex vertical className={s.days} style={{ width: '100%' }}>
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

    // calculate color for the badge
    const getColorForStatus = (day: Dayjs) => {
        if (isLoadingSlots) return CALENDAR_STATUSES_COLORS.CALCULATING;

        return (
            CALENDAR_STATUSES_COLORS[
                days[day.format('YYYY-MM-DD')]?.status as CalendarStatuses
            ] || CALENDAR_STATUSES_COLORS.FREE
        );
    };

    return (
        <Flex
            vertical
            style={{ width: '100%' }}
            gap={20}
            className={cn(s.wrapper, className)}
        >
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
