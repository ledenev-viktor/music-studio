import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNotification } from '~notifications';
import api, { AxiosApiError } from '~shared/lib/api.helper';

export const useRemoveImages = () => {
    const { notification } = useNotification();
    const queryClient = useQueryClient();

    return useMutation<
        void,
        AxiosApiError,
        {
            fileId: string;
        }
    >({
        mutationFn: (data) =>
            api.post('api/drive/delete', {
                fileId: data.fileId,
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['fetchImages'],
            });
            notification.success({
                message: 'Image was successfully removed',
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
