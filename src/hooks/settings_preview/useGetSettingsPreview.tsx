import { useQuery } from '@tanstack/react-query';
import api from '~lib/api.helper';
import { SettingsPreview } from '~types/settingsPreview';

export const useGetSettingsPreview = () => {
    return useQuery({
        queryKey: ['fetchSettingsPreview'],
        queryFn: async () => {
            const { data } = await api.get<SettingsPreview[]>(
                'api/supabase/settings_preview/get',
            );

            return data.map((item) => item.settings);
        },
    });
};
