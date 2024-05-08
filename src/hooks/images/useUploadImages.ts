import { useMutation, useQueryClient } from '@tanstack/react-query';
import api, { AxiosApiError, AxiosApiResponse } from '~lib/api.helper';
import { useNotification } from '~notifications';
import { DriveImage } from '~types/images';

export const useUploadImages = () => {
    const { notification } = useNotification();
    const queryClient = useQueryClient();

    return useMutation<
        AxiosApiResponse<DriveImage>,
        AxiosApiError,
        {
            fileType: string;
            url: string; //base64 url
            fileName: string;
        }
    >({
        mutationFn: (data) => api.post<DriveImage>(`api/drive/post`, data),
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
