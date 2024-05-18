import { FreeSlots } from '~types/common';
import { CALENDAR_STATUSES, CalendarStatuses } from './calendar';

export const DAY_NAMES = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
];

// TODO: remove when actual data is used
export const allTimeSlots: FreeSlots[] = [
    {
        id: 1,
        value: '11 - 12',
        label: '11:00 - 12:00',
    },
    {
        id: 2,
        value: '12 - 13',
        label: '12:00 - 13:00',
    },
    {
        id: 3,
        value: '13 - 14',
        label: '13:00 - 14:00',
    },
    {
        id: 4,
        value: '14 - 15',
        label: '14:00 - 15:00',
    },
    {
        id: 5,
        value: '15 - 16',
        label: '15:00 - 16:00',
    },
    {
        id: 6,
        value: '16 - 17',
        label: '16:00 - 17:00',
    },
    {
        id: 7,
        value: '17 - 18',
        label: '17:00 - 18:00',
    },
    {
        id: 8,
        value: '18 - 19',
        label: '18:00 - 19:00',
    },
    {
        id: 9,
        value: '19 - 20',
        label: '19:00 - 20:00',
    },
    {
        id: 10,
        value: '20 - 21',
        label: '20:00 - 21:00',
    },
    {
        id: 11,
        value: '21 - 22',
        label: '21:00 - 22:00',
    },
    {
        id: 12,
        value: '22 - 23',
        label: '22:00 - 23:00',
    },
];

// TODO: remove when actual data is used
export const days: Record<string, { status: CalendarStatuses; slots: any }> = {
    '2024-05-19': { status: CALENDAR_STATUSES.FULL, slots: [] },
    '2024-05-20': {
        status: CALENDAR_STATUSES.ALMOST_FULL,
        slots: [
            {
                id: 11,
                value: 11,
                label: '21:00 - 22:00',
            },
            {
                id: 12,
                value: 12,
                label: '22:00 - 23:00',
            },
        ],
    },
    '2024-05-21': {
        status: CALENDAR_STATUSES.ALMOST_FULL,
        slots: [
            {
                id: 12,
                value: 12,
                label: '22:00 - 23:00',
            },
        ],
    },
    '2024-05-22': {
        status: CALENDAR_STATUSES.FREE,
        slots: [
            {
                id: 1,
                value: 1,
                label: '11:00 - 12:00',
            },
            {
                id: 2,
                value: 2,
                label: '12:00 - 13:00',
            },
            {
                id: 3,
                value: 3,
                label: '13:00 - 14:00',
            },
            {
                id: 4,
                value: 4,
                label: '14:00 - 15:00',
            },
            {
                id: 5,
                value: 5,
                label: '15:00 - 16:00',
            },
            {
                id: 6,
                value: 6,
                label: '16:00 - 17:00',
            },
            // {
            //     id: 7,
            //     value: 7,
            //     label: '17:00 - 18:00',
            // },
            // {
            //     id: 8,
            //     value: 8,
            //     label: '18:00 - 19:00',
            // },
            // {
            //     id: 9,
            //     value: 9,
            //     label: '19:00 - 20:00',
            // },
        ],
    },
    '2024-05-23': {
        status: CALENDAR_STATUSES.FREE,
        slots: [
            {
                id: 1,
                value: 1,
                label: '11:00 - 12:00',
            },
            {
                id: 2,
                value: 2,
                label: '12:00 - 13:00',
            },
            {
                id: 5,
                value: 5,
                label: '15:00 - 16:00',
            },
            {
                id: 9,
                value: 9,
                label: '19:00 - 20:00',
            },
            {
                id: 10,
                value: 10,
                label: '20:00 - 21:00',
            },
            {
                id: 11,
                value: 11,
                label: '21:00 - 22:00',
            },
            {
                id: 12,
                value: 12,
                label: '22:00 - 23:00',
            },
        ],
    },
    '2024-05-24': {
        status: CALENDAR_STATUSES.FREE,
        slots: [
            {
                id: 9,
                value: 9,
                label: '19:00 - 20:00',
            },
            {
                id: 10,
                value: 10,
                label: '20:00 - 21:00',
            },
            {
                id: 11,
                value: 11,
                label: '21:00 - 22:00',
            },
            {
                id: 12,
                value: 12,
                label: '22:00 - 23:00',
            },
        ],
    },
    '2024-05-25': {
        status: CALENDAR_STATUSES.FREE,
        slots: [
            {
                id: 9,
                value: 9,
                label: '19:00 - 20:00',
            },
            {
                id: 10,
                value: 10,
                label: '20:00 - 21:00',
            },
            {
                id: 11,
                value: 11,
                label: '21:00 - 22:00',
            },
            {
                id: 12,
                value: 12,
                label: '22:00 - 23:00',
            },
        ],
    },
};
