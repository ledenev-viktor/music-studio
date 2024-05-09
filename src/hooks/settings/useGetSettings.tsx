import { useQuery } from '@tanstack/react-query';
import api from '~lib/api.helper';
import { Settings } from '~types/settings';

export const useGetSettings = () => {
    return useQuery({
        queryKey: ['fetchSettings'],
        queryFn: async () => {
            const { data } = await api.get<Settings[]>(
                'api/supabase/settings/get',
            );

            return data;
        },
    });
};
