import { useQuery } from '@tanstack/react-query';
import { Images } from '~types/images';
import api from '~shared/lib/api.helper';

export const useGetImages = () => {
    return useQuery({
        queryKey: ['fetchImages'],
        queryFn: async () => {
            const { data } = await api.get<Images>('api/drive/get');

            return data;
        },
    });
};
