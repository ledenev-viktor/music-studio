/* eslint-disable @typescript-eslint/no-explicit-any */
// TODO: fix when change the file
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Team } from '~types/team';
import { useNotification } from '~shared/providers';
import api from '~shared/lib/api.helper';

export const useUpdateTeam = () => {
    const { notification } = useNotification();
    const queryClient = useQueryClient();

    return useMutation<any, any, Team['elements'][]>({
        mutationFn: (data) => {
            const prepareData = data?.map((item: any) => {
                return {
                    elements: item,
                };
            });
            return api.post<any>('api/supabase/ourTeam/update', prepareData);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['fetchTeam'],
            });
            notification.success({
                message: 'Data saved successfully',
                placement: 'bottom',
            });
        },
        onError: (error) => {
            notification.error({
                message: 'Something went wrong',
                description: error.message,
                placement: 'bottom',
            });
        },
    });
};
