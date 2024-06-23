import { useQuery } from '@tanstack/react-query';
import api from '~lib/api.helper';
import { SettingsPreview } from '~types/settingsPreview';

export const useGetSettingsPreviewBase64 = () => {
    return useQuery({
        queryKey: ['fetchSettingsPreviewBase64'],
        queryFn: async () => {
            const { data } = await api.get<SettingsPreview[]>(
                'api/supabase/settings_preview/getWithBase64',
            );

            return data.map((item) => item.settings);
        },
        staleTime: Infinity,
    });
};
