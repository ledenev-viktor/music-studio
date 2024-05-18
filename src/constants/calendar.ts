export enum CALENDAR_STATUSES {
    FREE = 'FREE', // has 4 and more available intervals
    ALMOST_FULL = 'ALMOST_FULL', // has less that 4 available intervals
    FULL = 'FULL', // has no available intervals
    CALCULATING = 'CALCULATING',
}

export enum CALENDAR_STATUSES_COLORS {
    FREE = '#52c41a',
    ALMOST_FULL = '#fadb14',
    FULL = '#fa541c',
    CALCULATING = 'rgba(0, 0, 0, 0.06)',
}

export type CalendarStatuses = keyof typeof CALENDAR_STATUSES;
export type CalendarStatusColors =
    (typeof CALENDAR_STATUSES_COLORS)[CalendarStatuses];
