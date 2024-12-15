import { Dayjs, extend } from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import isoWeek from 'dayjs/plugin/isoWeek';
import advancedFormat from 'dayjs/plugin/advancedFormat';

extend(weekday);
extend(isoWeek);
extend(advancedFormat);

export const formatToUtcStartDay = (day: Dayjs) =>
    day.format('YYYY-MM-DDT00:00:00+04:00');
