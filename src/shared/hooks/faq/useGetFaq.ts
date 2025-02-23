import { useQuery } from '@tanstack/react-query';
import { Faq } from '~shared/types/faq';
import api from '~shared/lib/api.helper';

export const useGetFaq = () => {
    return useQuery({
        queryKey: ['fetchFaq'],
        queryFn: async () => {
            const { data } = await api.get<Faq[]>('api/supabase/faq/get');

            return data.map((item) => item.faq);
        },
    });
};
