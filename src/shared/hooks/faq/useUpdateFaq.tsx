/* eslint-disable @typescript-eslint/no-explicit-any */
// TODO: fix when change the file
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNotification } from '~shared/providers';
import api from '~shared/lib/api.helper';

export const useUpdateFaq = () => {
    const { notification } = useNotification();
    const queryClient = useQueryClient();

    return useMutation<
        any,
        any,
        {
            id: number;
            question: string;
            answer: string;
        }[]
    >({
        mutationFn: (data) => {
            const prepareData = data?.map((item: any) => {
                return {
                    faq: item,
                };
            });
            return api.post<any>('api/supabase/faq/update', prepareData);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['fetchFaq'],
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
