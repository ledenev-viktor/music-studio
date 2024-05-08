/* eslint-disable import/no-anonymous-default-export */
import { google } from 'googleapis';
import { NextApiRequest, NextApiResponse } from 'next/types';
import jwtClient from '../jwt';

const fetchApi = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const calendar = google.calendar({
            version: 'v3',
            auth: jwtClient,
        });

        const events = await calendar.events.list({
            calendarId: process.env.CALENDAR_ID,
        });

        res.status(200).end({ events });
    } catch (error) {
        res.status(500).end({
            error: 'Failed to retrieve access token' + error,
        });
    }
};

export default fetchApi;
