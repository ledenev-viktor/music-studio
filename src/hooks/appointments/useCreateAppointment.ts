import { useMutation } from '@tanstack/react-query';
import { FieldValues } from 'react-hook-form';
import api from '~lib/api.helper';
import { useNotification } from '~notifications';
import { CalendarEvent } from '~types/google';

export const useCreateAppointments = () => {
    const { notification } = useNotification();

    return useMutation<any, any, FieldValues>({
        mutationFn: (data) => {
            const { timeSlotsEvent, userName, userNameTelegram, comment } =
                data;
            const sendArrayData = timeSlotsEvent.map((slot: CalendarEvent) => {
                return {
                    id_calendar: slot.id,
                    createdAt: slot.created,
                    fullName: userName,
                    comment: comment,
                    telegram: userNameTelegram,
                    startTime: slot.start.dateTime,
                    endTime: slot.end.dateTime,
                };
            });

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
