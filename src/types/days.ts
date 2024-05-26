import { CALENDAR_STATUSES } from '~constants/calendar';
import { FreeSlots } from './common';

export type DaysWithSlots = Record<
    string,
    { status: CALENDAR_STATUSES; slots: FreeSlots[] }
>;
