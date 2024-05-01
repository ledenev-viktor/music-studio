import { useQuery } from '@tanstack/react-query';
import { api } from '~utils/api.helper';

export const fetchDummyKey = ['fetchDummy'];

export const fetchDummy = async () => {
    const { data } = await api.get<any>('/dummy');

    return data;
};
export const useGetDummy = () => {
    return useQuery({
        queryKey: fetchDummyKey,
        queryFn: fetchDummy,
    });
};
