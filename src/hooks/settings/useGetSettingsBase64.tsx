import { useQuery } from '@tanstack/react-query';
import api from '~lib/api.helper';
import { Settings } from '~types/settings';

export const useGetSettingsBase64 = () => {
    return useQuery({
        queryKey: ['fetchSettingsBase64'],
        queryFn: async () => {
            const { data } = await api.get<Settings[]>(
                'api/supabase/settings/getWithBase64',
            );

            return data.map((item) => item.settings);
        },
        staleTime: Infinity,
    });
};
