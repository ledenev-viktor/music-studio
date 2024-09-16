import { google } from 'googleapis';
import { NextApiResponse } from 'next/types';
import { jwtClientGoogleCalendar } from '~lib/jwtClientGoogleCalendar';
import {
    NextApiRequestWithSession,
    withSessionCheck,
} from '~lib/withCheckSession';

async function handler(req: NextApiRequestWithSession, res: NextApiResponse) {
    try {
        const calendar = google.calendar({
            version: 'v3',
            auth: jwtClientGoogleCalendar,
        });

        const { timeMin, timeMax } = req.query;

        if (!timeMin || !timeMax) {
            return res
                .status(400)
                .json({ error: 'Missing timeMin or timeMax parameter' });
        }

        const { data } = await calendar.events.list({
            calendarId: process.env.CALENDAR_ID,
            timeMin: timeMin as string,
            timeMax: timeMax as string,
            timeZone: 'Asia/Tbilisi',
        });

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({
            error: 'Failed to retrieve access token' + error,
        });
    }
}

export default withSessionCheck(handler);
