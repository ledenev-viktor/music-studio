export type CalendarEvent = {
    kind?: string;
    etag?: string;
    id?: string;
    status?: string;
    htmlLink?: string;
    created?: string;
    updated?: string;
    summary?: string;
    description?: string;
    creator?: {
        email: string;
        self: boolean;
    };
    organizer?: {
        email: string;
        self: boolean;
    };
    start: {
        dateTime: string;
        timeZone: string;
    };
    end?: {
        dateTime: string;
        timeZone: string;
    };
    iCalUID?: string;
    sequence?: number;
    attendees?: [
        {
            email?: string;
            organizer?: boolean;
            self?: boolean;
            responseStatus?: string;
        },
        {
            email?: string;
            responseStatus?: string;
        },
    ];
    hangoutLink?: string;
    conferenceData?: {
        entryPoints?: [
            {
                entryPointType?: string;
                uri?: string;
                label?: string;
            },
        ];
        conferenceSolution?: {
            key?: {
                type?: string;
            };
            name?: string;
            iconUri?: string;
        };
        conferenceId?: string;
    };
    reminders?: {
        useDefault?: boolean;
    };
    eventType?: string;
};
export const events: CalendarEvent[] = [
    {
        kind: 'calendar#event',
        etag: '"3429169713576000"',
        id: '7rr4p6c3793glnq9bghg5nom3d',
        status: 'confirmed',
        htmlLink:
            'https://www.google.com/calendar/event?eid=N3JyNHA2YzM3OTNnbG5xOWJnaGc1bm9tM2QgdDI0MTQ5ODY1QG0',
        created: '2024-05-01T17:34:16.000Z',
        updated: '2024-05-01T17:34:16.788Z',
        summary: 'test event ',
        creator: {
            email: 't24149865@gmail.com',
            self: true,
        },
        organizer: {
            email: 't24149865@gmail.com',
            self: true,
        },
        start: {
            dateTime: '2024-05-06T09:00:00+03:00',
            timeZone: 'Europe/Moscow',
        },
        end: {
            dateTime: '2024-05-06T11:00:00+03:00',
            timeZone: 'Europe/Moscow',
        },
        iCalUID: '7rr4p6c3793glnq9bghg5nom3d@google.com',
        sequence: 0,
        reminders: {
            useDefault: true,
        },
        eventType: 'default',
    },
    {
        kind: 'calendar#event',
        etag: '"3429169724960000"',
        id: '29sd2c7udn33r9n6k3718kk3cm',
        status: 'confirmed',
        htmlLink:
            'https://www.google.com/calendar/event?eid=MjlzZDJjN3VkbjMzcjluNmszNzE4a2szY20gdDI0MTQ5ODY1QG0',
        created: '2024-05-01T17:34:22.000Z',
        updated: '2024-05-01T17:34:22.480Z',
        summary: 'test event',
        creator: {
            email: 't24149865@gmail.com',
            self: true,
        },
        organizer: {
            email: 't24149865@gmail.com',
            self: true,
        },
        start: {
            dateTime: '2024-05-08T10:45:00+03:00',
            timeZone: 'Europe/Moscow',
        },
        end: {
            dateTime: '2024-05-08T13:00:00+03:00',
            timeZone: 'Europe/Moscow',
        },
        iCalUID: '29sd2c7udn33r9n6k3718kk3cm@google.com',
        sequence: 0,
        reminders: {
            useDefault: true,
        },
        eventType: 'default',
    },
    {
        kind: 'calendar#event',
        etag: '"3429173227184000"',
        id: '3tg8s7ku52po499o1puvtif95f',
        status: 'confirmed',
        htmlLink:
            'https://www.google.com/calendar/event?eid=M3RnOHM3a3U1MnBvNDk5bzFwdXZ0aWY5NWYgdDI0MTQ5ODY1QG0',
        created: '2024-05-01T17:16:30.000Z',
        updated: '2024-05-01T18:03:33.592Z',
        summary: 'test Event',
        description:
            '<br><br><span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi aut tempora quod, possimus recusandae quia et sit perferendis, aliquam vel harum voluptatem fuga nesciunt. Harum, beatae expedita! Animi, ullam culpa.</span>',
        creator: {
            email: 't24149865@gmail.com',
            self: true,
        },
        organizer: {
            email: 't24149865@gmail.com',
            self: true,
        },
        start: {
            dateTime: '2024-05-02T11:30:00+03:00',
            timeZone: 'Europe/Moscow',
        },
        end: {
            dateTime: '2024-05-02T12:30:00+03:00',
            timeZone: 'Europe/Moscow',
        },
        iCalUID: '3tg8s7ku52po499o1puvtif95f@google.com',
        sequence: 0,
        attendees: [
            {
                email: 't24149865@gmail.com',
                organizer: true,
                self: true,
                responseStatus: 'accepted',
            },
            {
                email: 'test@test.com',
                responseStatus: 'needsAction',
            },
        ],
        hangoutLink: 'https://meet.google.com/usp-tbiq-wvp',
        conferenceData: {
            entryPoints: [
                {
                    entryPointType: 'video',
                    uri: 'https://meet.google.com/usp-tbiq-wvp',
                    label: 'meet.google.com/usp-tbiq-wvp',
                },
            ],
            conferenceSolution: {
                key: {
                    type: 'hangoutsMeet',
                },
                name: 'Google Meet',
                iconUri:
                    'https://fonts.gstatic.com/s/i/productlogos/meet_2020q4/v6/web-512dp/logo_meet_2020q4_color_2x_web_512dp.png',
            },
            conferenceId: 'usp-tbiq-wvp',
        },
        reminders: {
            useDefault: true,
        },
        eventType: 'default',
    },
    {
        kind: 'calendar#event',
        etag: '"3429212514632000"',
        id: '3c6m0jakgl1e046l6pa5ld9qve',
        status: 'confirmed',
        htmlLink:
            'https://www.google.com/calendar/event?eid=M2M2bTBqYWtnbDFlMDQ2bDZwYTVsZDlxdmUgdDI0MTQ5ODY1QG0',
        created: '2024-05-01T23:30:34.000Z',
        updated: '2024-05-01T23:30:57.316Z',
        summary: 'test2',
        description: 'description test2',
        creator: {
            email: 't24149865@gmail.com',
            self: true,
        },
        organizer: {
            email: 't24149865@gmail.com',
            self: true,
        },
        start: {
            dateTime: '2024-05-02T13:00:00+03:00',
            timeZone: 'Europe/Moscow',
        },
        end: {
            dateTime: '2024-05-02T14:00:00+03:00',
            timeZone: 'Europe/Moscow',
        },
        iCalUID: '3c6m0jakgl1e046l6pa5ld9qve@google.com',
        sequence: 0,
        reminders: {
            useDefault: true,
        },
        eventType: 'default',
    },
];
