import { useQuery } from '@tanstack/react-query';
import api from '~lib/api.helper';

export const fetchPicturesKey = ['fetchPictures'];

export const useGetPicture = () => {
    return useQuery({
        queryKey: fetchPicturesKey,
        queryFn: async () => {
            const { data: response } = await api.get<
                { id: number; picture_url: string }[]
            >('api/supabase/pictures');

            return response.map(
                (item: { id: number; picture_url: string }) =>
                    ({
                        id: item.id,
                        pictureUrl: item.picture_url,
                    }) || [],
            );
        },
    });
};
