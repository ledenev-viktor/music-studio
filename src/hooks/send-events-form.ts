import { FieldValues } from 'react-hook-form';
import { CalendarEvent } from '~types/google';
import api from '~lib/api.helper';

export const sendDataAppointments = async (sendData: FieldValues) => {
    const { timeSlotsEvent, userName, userNameTelegram, comment } = sendData;
    const sendArrayData = timeSlotsEvent.map((slot: CalendarEvent) => {
        return {
            id_calendar: slot.id,
            createdAt: slot.created,
            fullName: userName,
            comment: comment,
            telegram: userNameTelegram,
            startTime: slot.start.dateTime,
            endTime: slot.end.dateTime,
            status: 'PENDING',
            // updatedAt: slot.updated,
        };
    });

    const data = await api.post('api/supabase', {
        data: sendArrayData,
    });

    return data;
};
