/* eslint-disable import/no-anonymous-default-export */
import { google } from 'googleapis';
import { NextApiRequest, NextApiResponse } from 'next/types';
import googleConfig from '~lib/google';

const fetchApi = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const jwtClient = new google.auth.JWT(
            googleConfig.clientEmail,
            undefined,
            googleConfig.privateKey,
            'https://www.googleapis.com/auth/calendar',
            undefined,
        );

        const calendar = google.calendar({
            version: 'v3',
            auth: jwtClient,
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
};

export default fetchApi;
