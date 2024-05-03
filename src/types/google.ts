export type Event = {
    id: string;
    status: string;
    htmlLink: string;
    created: Intl.DateTimeFormat;
    upDated: Intl.DateTimeFormat;
    start: {
        date: Date;
        datetime: Intl.DateTimeFormat;
        timeZone: string;
    };
    end: {
        date: Date;
        datetime: Intl.DateTimeFormat;
        timeZone: string;
    };
    endTimeUnspecified: boolean;
    originalStartTime: {
        date: Date;
        datetime: Intl.DateTimeFormat;
        timeZone: string;
    };
    eventType: string;
};

export type CalendarEvents = {
    updated: Intl.DateTimeFormat;
    timeZone: string;
    nextPageToken: string;
    nextSyncToken: string;
    items: Event[];
};

export type CalendarList = {
    timeZone: string;
    nextPageToken: string;
    nextSyncToken: string;
    items: CalendarEvents[];
};
