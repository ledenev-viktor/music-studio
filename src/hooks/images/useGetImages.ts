import { useQuery } from '@tanstack/react-query';
import api from '~lib/api.helper';
import { Images } from '~types/images';

export const useGetImages = () => {
    return useQuery({
        queryKey: ['fetchImages'],
        queryFn: async () => {
            const { data } = await api.get<Images>('api/drive/get');

            return data;
        },
    });
};
