import { useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { FreeSlots } from '~types/common';
import { getAvailableSlots } from '~utils/getAvailableSlots';
import { useGetEvents } from './events';

export const useGetAvailableSlots = (valueDate: Dayjs) => {
    const { data: events, isLoading } = useGetEvents();
    const [slots, setSlots] = useState<FreeSlots[]>([]);

    useEffect(() => {
        const freeSlots = getAvailableSlots(
            dayjs(valueDate).format('YYYY-MM-DD'),
            events,
        )?.map(([start, end], index) => ({
            id: index,
            value: `${start}-${end}`,
            label: `${start}:00 - ${end}:00`,
        }));
        setSlots(freeSlots);
    }, [events, valueDate]);

    return { slots, isLoadingEvents: isLoading };
};
