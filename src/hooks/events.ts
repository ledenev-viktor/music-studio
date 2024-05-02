import { useQuery } from '@tanstack/react-query';
import { CalendarEvents } from '~types/google';
import api from '~utils/api.helper';

export const fetchEventsKey = ['fetchEvents'];

export const fetchEvents = async () => {
    const { data } = await api.get<{ events: { data: CalendarEvents } }>(
        'api/events',
    );

    return data.events.data.items;
};
export const useGetEvents = () => {
    return useQuery({
        queryKey: fetchEventsKey,
        queryFn: fetchEvents,
    });
};
