/* eslint-disable @typescript-eslint/no-explicit-any */
// TODO: fix when change the file
import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '~lib/api.helper';
import { useNotification } from '~notifications';

export const useUpdateSettings = () => {
    const { notification } = useNotification();
    const queryClient = useQueryClient();

    return useMutation<
        any,
        any,
        {
            id: number;
            pictureUrl?: string;
            fileDownload?: string;
            title?: string;
            price?: number;
            desc?: string;
            active?: boolean;
        }[]
    >({
        mutationFn: (data) => {
            const prepareData = data?.map((item: any) => {
                return {
                    settings: item,
                };
            });
            return api.post<any>('api/supabase/settings/update', prepareData);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['fetchSettings'],
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
