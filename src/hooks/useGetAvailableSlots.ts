import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { useWatch } from 'react-hook-form';
import { FreeSlots } from '~types/common';
import { getAvailableSlots } from '~utils/getAvailableSlots';
import { useGetEvents } from './events';

export const useGetAvailableSlots = () => {
    const { data: events, isLoading } = useGetEvents();
    const valueDate = useWatch({ name: 'date' });
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
