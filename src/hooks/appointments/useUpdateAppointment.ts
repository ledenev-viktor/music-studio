import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '~lib/api.helper';
import { Appointment } from '~types/appointments';
import { useNotification } from '~notifications';
import { AppointmentStatuses } from '~constants/status';

export const updateAppointmentsKey = ['updateAppointments'];

export const useUpdateAppointments = () => {
    const { toast } = useNotification();
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
            api.post<any>('api/supabase/update', {
                appointmentId: data.appointmentId,
                status: data.status,
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['fetchAppointments'],
            });
            toast.success({
                message: 'Appointment was successfully updated',
                description: `new status ${status}`,
                placement: 'bottom',
            });
        },
        onError: (error) => {
            toast.error({
                message: 'Something went wrong',
                description: error.message,
                placement: 'bottom',
            });
        },
    });
};
