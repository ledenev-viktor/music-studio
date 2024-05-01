/* eslint-disable import/no-anonymous-default-export */
import { google } from 'googleapis';
import { NextApiRequest, NextApiResponse } from 'next/types';
import createGoogleClient from '~utils/api.google';

const fetchApi = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const jwtClient = createGoogleClient();

        const calendar = google.calendar({
            version: 'v3',
            auth: jwtClient,
        });

        const event = await calendar.events.list({
            calendarId: 'primary',
        });

        res.status(200).json({ event });
    } catch (error) {
        res.status(500).json({
            error: 'Failed to retrieve access token' + error,
        });
    }
};

export default fetchApi;
