import { useQuery } from '@tanstack/react-query';
import api from '~lib/api.helper';

export const fetchAppointmentsKey = ['fetchAppointments'];

export const useGetAppointments = () => {
    return useQuery({
        queryKey: fetchAppointmentsKey,
        queryFn: async () => {
            const data = await api.get<any>('api/supabase');

            return data;
        },
    });
};
