import { useQuery } from '@tanstack/react-query';
import api from '~lib/api.helper';
import { Settings, SlideWithBase64 } from '~types/settings';

export const useGetSettingsBase64 = () => {
    return useQuery<any, any, SlideWithBase64[]>({
        queryKey: ['fetchSettingsBase64'],
        queryFn: async () =>
            api.get<Settings[]>('api/supabase/settings/getWithBase64'),
        select: (res) =>
            res.data
                .map((item: Settings) => {
                    const slide = item.settings;
                    return slide;
                })
                .filter((item: SlideWithBase64) => item.active),
        staleTime: Infinity,
    });
};
