import { useQuery } from '@tanstack/react-query';
import api from '~utils/api.helper';

export const fetchEventsKey = ['fetchEvents'];

export const fetchEvents = async () => {
    const { data } = await api.get<any>('api/events');

    return data;
};
export const useGetEvents = () => {
    return useQuery({
        queryKey: fetchEventsKey,
        queryFn: fetchEvents,
    });
};
