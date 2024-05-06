import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '~lib/api.helper';
import { useNotification } from '~notifications';

export const useUploadImages = () => {
    const { notification } = useNotification();
    const queryClient = useQueryClient();

    return useMutation<
        any,
        any,
        {
            fileType: string;
            url: string; //base64 url
            fileName: string;
        }
    >({
        mutationFn: async (data) => api.post<void>(`api/drive/post`, data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['fetchImages'],
            });
            notification.success({
                message: 'Image was successfully uploaded',
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
