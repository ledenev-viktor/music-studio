import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '~lib/api.helper';
import { useNotification } from '~notifications';

export const useUpdateSettings = () => {
    const { notification } = useNotification();
    const queryClient = useQueryClient();

    return useMutation<any, any, string[]>({
        mutationFn: (data) =>
            api.post<any>('api/supabase/settings/update', data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['fetchSettings'],
            });
            notification.success({
                message: 'Settings were successfully updated',
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
