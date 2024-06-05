import { Dayjs } from 'dayjs';
import { AppointmentStatuses } from '~constants/status';

export type Appointment = {
    startTimestamp: string;
    date: string;
    comment: string;
    createdAt: string;
    endTime: string;
    fullName: string;
    id: number;
    startTime: string;
    telegram: string;
    instagram: string;
    phone: string;
    status: AppointmentStatuses;
};

export type Appointments = [string, Appointment[]][];

export type FormFields = {
    date: string;
    userName: string;
    userNameTelegram: string;
    selectedTimeSlots: [];
    isCommentNeeded: boolean;
    comment: string;
    weekStartDay?: Dayjs;
};

export type EditFormData = {
    // status:,
    fullName: string;
    phone: string;
    time: Dayjs[];
    comment: string;
    telegram: string;
    instagram: string;
    id: number;
};
