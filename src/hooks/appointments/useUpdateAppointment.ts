import { useMutation, useQueryClient } from '@tanstack/react-query';
import api, { AxiosApiError } from '~lib/api.helper';
import { Appointment } from '~types/appointments';
import { useNotification } from '~notifications';
import { AppointmentStatuses } from '~constants/status';

export const useUpdateAppointments = () => {
    const { notification } = useNotification();
    const queryClient = useQueryClient();

    return useMutation<
        null,
        AxiosApiError,
        {
            appointment: Appointment;
            status: AppointmentStatuses;
        }
    >({
        mutationFn: async (data) => {
            const { data: eventData } = await api.post(
                'api/calendar/post',
                data.appointment,
            );

            return api.post('api/supabase/appointments/post', {
                calendarEventId: eventData.id,
                appointmentId: data.appointment.id,
                status: data.status,
                calendarLink: eventData.htmlLink,
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['fetchAppointments'],
            });
            notification.success({
                message: 'Event was successfully created!',
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
