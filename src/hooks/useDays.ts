import { Dayjs } from 'dayjs';
import { useQueryClient } from '@tanstack/react-query';
import { getAvailableSlots } from '~utils/getAvailableSlots';
import { formatToUtcStartDay } from '~utils/dayjs.helpers';
import { DaysWithSlots } from '~types/days';
import { useGetEvents } from './events';
import { CALENDAR_STATUSES } from '~constants/calendar';

export const useSetDays = (startDate: Dayjs, endDate: Dayjs) => {
    const queryClient = useQueryClient();
    const start = formatToUtcStartDay(startDate);
    const end = formatToUtcStartDay(endDate);
    const { data: events, isLoading } = useGetEvents(start, end);
    const days: DaysWithSlots = {};

    for (let i = 0; i < 7; i += 1) {
        const current = startDate.add(i, 'day').format('YYYY-MM-DD');

        const daySlots = getAvailableSlots(current, events)?.map(
            ([start, end], index) => ({
                id: index,
                value: `${start}-${end}`,
                label: `${start}:00 - ${end}:00`,
            }),
        );

        days[current] = {
            status:
                daySlots.length > 4
                    ? CALENDAR_STATUSES.FREE
                    : daySlots.length > 0
                      ? CALENDAR_STATUSES.ALMOST_FULL
                      : CALENDAR_STATUSES.FULL,
            slots: daySlots,
        };
    }

    queryClient.setQueryData(['daysStatuses', start, end], days);
    return isLoading;
};

export const useGetDays = (startDate: Dayjs, endDate: Dayjs) => {
    const queryClient = useQueryClient();
    return queryClient.getQueryData([
        'daysStatuses',
        formatToUtcStartDay(startDate),
        formatToUtcStartDay(endDate),
    ]) as DaysWithSlots;
};
