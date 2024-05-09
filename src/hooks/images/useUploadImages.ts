import { useMutation, useQueryClient } from '@tanstack/react-query';
import api, { AxiosApiError } from '~lib/api.helper';
import { useNotification } from '~notifications';

export const useUploadImages = () => {
    const { notification } = useNotification();
    const queryClient = useQueryClient();

    return useMutation<
        void,
        AxiosApiError,
        {
            fileType: string;
            url: string; //base64 url
            fileName: string;
        }
    >({
        mutationFn: (data) => api.post(`api/drive/post`, data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['fetchImages'],
            });
            notification.success({
                message: 'Image was successfully uploaded',
                description:
                    'Preview for the picture will be available in a few minutes',
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
