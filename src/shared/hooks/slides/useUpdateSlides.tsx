/* eslint-disable @typescript-eslint/no-explicit-any */
// TODO: fix when change the file
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Slides } from '~types/slides';
import { useNotification } from '~shared/providers';
import api from '~shared/lib/api.helper';

export const useUpdateSlides = () => {
    const { notification } = useNotification();
    const queryClient = useQueryClient();

    return useMutation<any, any, Slides['elements'][]>({
        mutationFn: (data) => {
            const prepareData = data?.map((item: any) => {
                return {
                    elements: item,
                };
            });
            return api.post<any>('api/supabase/slides/update', prepareData);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['fetchSlides'],
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
