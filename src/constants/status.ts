export const APPOINTMENTS_STATUSES = {
    APPROVED: 'APPROVED',
    PENDING: 'PENDING',
    REJECTED: 'REJECTED',
} as const;

export const APPOINTMENTS_STATUSES_COLORS = {
    APPROVED: '#52c41a',
    PENDING: '#fadb14',
    REJECTED: '#fa541c',
};

export type AppointmentStatuses = keyof typeof APPOINTMENTS_STATUSES;
export type AppointmentStatusColors =
    (typeof APPOINTMENTS_STATUSES_COLORS)[AppointmentStatuses];
