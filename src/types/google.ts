export type CalendarEvent = {
    id: string;
    status: string;
    htmlLink: string;
    created: string;
    upDated: string;
    start: {
        date: Date;
        dateTime: string;
        timeZone: string;
    };
    end: {
        date: Date;
        dateTime: string;
        timeZone: string;
    };
    endTimeUnspecified: boolean;
    originalStartTime: {
        date: Date;
        dateTime: string;
        timeZone: string;
    };
    eventType: string;
};
export type CalendarEventWithLabel = CalendarEvent & {
    label: { start: string; end: string };
};

export type CalendarEvents = {
    updated: string;
    timeZone: string;
    nextPageToken: string;
    nextSyncToken: string;
    items: CalendarEvent[];
};

export type CalendarList = {
    timeZone: string;
    nextPageToken: string;
    nextSyncToken: string;
    items: CalendarEvents[];
};
