import { useQuery } from '@tanstack/react-query';
import { Settings } from '~types/settings';
import api from '~shared/lib/api.helper';

export const useGetSettings = () => {
    return useQuery({
        queryKey: ['fetchSettings'],
        queryFn: async () => {
            const { data } = await api.get<Settings[]>(
                'api/supabase/settings/get',
            );

            return data.map((item) => item.settings);
        },
        staleTime: Infinity,
    });
};
