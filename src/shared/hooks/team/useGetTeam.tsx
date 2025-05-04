import { useQuery } from '@tanstack/react-query';
import { Team } from '~types/team';
import api from '~shared/lib/api.helper';

export const useGetTeam = () => {
    return useQuery({
        queryKey: ['fetchTeam'],
        queryFn: async () => {
            const { data } = await api.get<Team[]>('api/supabase/ourTeam/get');

            return data.map((item) => item.elements);
        },
    });
};
