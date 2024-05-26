import { useMutation, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import api, { AxiosApiError } from '~lib/api.helper';
import { EditFormData } from '~types/appointments';
import { useNotification } from '~notifications';

export const useEditAppointments = () => {
    const { notification } = useNotification();
    const queryClient = useQueryClient();

    return useMutation<null, AxiosApiError, EditFormData>({
        mutationFn: (data) => {
            return api.post('api/supabase/appointments/edit', {
                comment: data.comment,
                fullName: data.fullName,
                startTime: data.time[0].format('YYYY-MM-DDTHH:ss'),
                endTime: data.time[1].format('YYYY-MM-DDTHH:ss'),
                telegram: data.telegram,
                instagram: data.instagram,
                phone: data.phone,
                updatedAt: dayjs().unix(),
                id: data.id,
                // status: data.status,
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['fetchAppointments'],
            });
            notification.success({
                message: 'Appointment was successfully updated',
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
