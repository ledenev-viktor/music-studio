import { useQuery } from '@tanstack/react-query';
import api from '~lib/api.helper';
import { Settings, SlideWithBase64 } from '~types/settings';

export const useGetSettingsBase64 = () => {
    return useQuery<any, any, SlideWithBase64[]>({
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
