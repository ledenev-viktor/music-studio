import { useMutation } from '@tanstack/react-query';
import api from '~lib/api.helper';
import { useNotification } from '~notifications';
import { FormFields } from '~types/appointments';
import { CalendarEvent } from '~types/google';

export const useCreateAppointments = () => {
    const { notification } = useNotification();

    return useMutation<any, any, FormFields>({
        mutationFn: (data) => {
            const { selectedTimeSlots, userName, userNameTelegram, comment } =
                data;
            const sendArrayData = selectedTimeSlots.map(
                (slot: CalendarEvent) => {
                    return {
                        id_calendar: slot.id,
                        createdAt: slot.created,
                        fullName: userName,
                        comment: comment,
                        telegram: userNameTelegram,
                        startTime: slot.start.dateTime,
                        endTime: slot.end.dateTime,
                    };
                },
            );

            return api.post<any>(
                'api/supabase/appointments/insert',
                sendArrayData,
            );
        },
        onSuccess: () => {
            notification.success({
                message: 'Appointment has been created',
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
