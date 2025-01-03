import { useQuery } from '@tanstack/react-query';
import { Appointment } from '~types/appointments';
import {
    extractDay,
    extractTime,
    extractDate,
} from '~shared/utils/date.helpers';
import { prettifyAppointments } from '~shared/utils/prettifyAppointments';
import api from '~shared/lib/api.helper';

export const useGetAppointments = () => {
    return useQuery({
        queryKey: ['fetchAppointments'],
        queryFn: async () => {
            const { data } = await api.get<Appointment[]>(
                'api/supabase/appointments/get',
            );

            const mappedData = data.map((item) => ({
                ...item,
                date: extractDate(item.startTime),
                startTimestamp: item.startTime,
                startTime: extractTime(item.startTime),
                endTime: extractTime(item.endTime),
                day: extractDay(item.startTime),
            }));

            return mappedData ? prettifyAppointments(mappedData) : [];
        },
    });
};
