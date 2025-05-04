import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useGetEvents = (startDate: string, endDate: string) => {
    return useQuery({
        queryKey: ['fetchEvents', startDate, endDate],
        queryFn: async () => {
            const { data } = await axios.get('/api/calendar/', {
                params: {
                    timeMin: startDate,
                    timeMax: endDate,
                },
            });

            return data.items;
        },
    });
};
