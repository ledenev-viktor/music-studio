import { useQuery } from '@tanstack/react-query';
import { Slides } from '~shared/types/slides';
import api from '~shared/lib/api.helper';

export const useGetSlides = () => {
    return useQuery({
        queryKey: ['fetchSlides'],
        queryFn: async () => {
            const { data } = await api.get<Slides[]>('api/supabase/slides/get');

            return data.map((item) => item.elements);
        },
    });
};
