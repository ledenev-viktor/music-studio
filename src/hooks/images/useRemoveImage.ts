import { useMutation, useQueryClient } from '@tanstack/react-query';
import api, { AxiosApiError } from '~lib/api.helper';
import { useNotification } from '~notifications';

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
