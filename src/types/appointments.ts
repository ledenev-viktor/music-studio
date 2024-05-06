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
    status: AppointmentStatuses;
};
