// import { useMutation, useQueryClient } from '@tanstack/react-query';
// import api from '~lib/api.helper';
// import { useNotification } from '~notifications';
// import { Image } from '~types/images';

// export const useSetMainImage = () => {
//     const { notification } = useNotification();
//     const queryClient = useQueryClient();

//     return useMutation<any, any, Image>({
//         mutationFn: (data) =>
//             api.post<void>('api/supabase/images/update', {
//                 ...data,
//                 isSelected: `${data.isSelected}`, //need to be a string
//             }),
//         onSuccess: () => {
//             queryClient.invalidateQueries({
//                 queryKey: ['fetchImages'],
//             });
//             notification.success({
//                 message: 'Image was successfully removed',
//                 placement: 'bottom',
//             });
//         },
//         onError: (error) => {
//             notification.error({
//                 message: 'Something went wrong',
//                 description: error.message,
//                 placement: 'bottom',
//             });
//         },
//     });
// };
