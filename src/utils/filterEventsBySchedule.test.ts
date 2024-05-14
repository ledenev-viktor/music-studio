import { filterEventsBySchedule } from './filterEventsBySchedule';

// describe('', () => {
//     it('', () => {
//         expect('').toBe('');
//     });
// });
/*
[
    "2024-05-21T11:00:00",
    "2024-05-21T23:00:00"
]


[
    {
        start: {
            dateTime: '2024-05-19T11:00:00+03:00',
            timeZone: 'Europe/Moscow',
        },
        end: {
            dateTime: '2024-05-19T23:45:00+03:00',
            timeZone: 'Europe/Moscow',
        },
    },
    {
        start: {
            dateTime: '2024-05-20T11:15:00+03:00',
            timeZone: 'Europe/Moscow',
        },
        end: {
            dateTime: '2024-05-20T14:00:00+03:00',
            timeZone: 'Europe/Moscow',
        },
    },
    {
        start: {
            dateTime: '2024-05-20T13:00:00+03:00',
            timeZone: 'Europe/Moscow',
        },
        end: {
            dateTime: '2024-05-20T15:00:00+03:00',
            timeZone: 'Europe/Moscow',
        },
    },
    {
        start: {
            dateTime: '2024-05-21T18:00:00+03:00',
            timeZone: 'Europe/Moscow',
        },
        end: {
            dateTime: '2024-05-21T20:15:00+03:00',
            timeZone: 'Europe/Moscow',
        },
    },
    {
        start: {
            dateTime: '2024-05-22T11:00:00+03:00',
            timeZone: 'Europe/Moscow',
        },
        end: {
            dateTime: '2024-05-22T23:00:00+03:00',
            timeZone: 'Europe/Moscow',
        },
    },
];
*/
describe('', () => {
    const dateTimeRange = ['2024-05-20T11:00:00', '2024-05-20T23:00:00'];
    const events = [
        {
            start: {
                dateTime: '2024-05-19T11:00:00+03:00',
                timeZone: 'Europe/Moscow',
            },
            end: {
                dateTime: '2024-05-19T23:45:00+03:00',
                timeZone: 'Europe/Moscow',
            },
        },
        {
            start: {
                dateTime: '2024-05-20T11:15:00+03:00',
                timeZone: 'Europe/Moscow',
            },
            end: {
                dateTime: '2024-05-20T14:00:00+03:00',
                timeZone: 'Europe/Moscow',
            },
        },
        {
            start: {
                dateTime: '2024-05-20T13:00:00+03:00',
                timeZone: 'Europe/Moscow',
            },
            end: {
                dateTime: '2024-05-20T15:00:00+03:00',
                timeZone: 'Europe/Moscow',
            },
        },
        {
            start: {
                dateTime: '2024-05-21T18:00:00+03:00',
                timeZone: 'Europe/Moscow',
            },
            end: {
                dateTime: '2024-05-21T20:15:00+03:00',
                timeZone: 'Europe/Moscow',
            },
        },
        {
            start: {
                dateTime: '2024-05-22T11:00:00+03:00',
                timeZone: 'Europe/Moscow',
            },
            end: {
                dateTime: '2024-05-22T23:00:00+03:00',
                timeZone: 'Europe/Moscow',
            },
        },
    ];
    it('Filtering events by selected date and time range', () => {
        expect(filterEventsBySchedule(events, dateTimeRange)).toEqual([
            {
                start: {
                    dateTime: '2024-05-20T11:15:00+03:00',
                    timeZone: 'Europe/Moscow',
                },
                end: {
                    dateTime: '2024-05-20T14:00:00+03:00',
                    timeZone: 'Europe/Moscow',
                },
            },
            {
                start: {
                    dateTime: '2024-05-20T13:00:00+03:00',
                    timeZone: 'Europe/Moscow',
                },
                end: {
                    dateTime: '2024-05-20T15:00:00+03:00',
                    timeZone: 'Europe/Moscow',
                },
            },
        ]);
    });
});
