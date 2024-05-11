import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '~lib/api.helper';
import { Appointment } from '~types/appointments';
import { useNotification } from '~notifications';
import { AppointmentStatuses } from '~constants/status';

export const useUpdateAppointments = () => {
    const { notification } = useNotification();
    const queryClient = useQueryClient();

    return useMutation<
        any,
        any,
        {
            appointmentId: Appointment['id'];
            status: AppointmentStatuses;
        }
    >({
        mutationFn: (data) =>
            api.post<any>('api/supabase/appointments/post', {
                appointmentId: data.appointmentId,
                status: data.status,
            }),
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