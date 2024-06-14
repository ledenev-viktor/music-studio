/* eslint-disable import/no-anonymous-default-export */
import dayjs from 'dayjs';
import { google } from 'googleapis';
import { NextApiRequest, NextApiResponse } from 'next/types';
import { jwtClientGoogle } from '~lib/jwtClientGoogle';

export default async function (req: NextApiRequest, res: NextApiResponse) {
    try {
        const jwtClient = jwtClientGoogle(
            'https://www.googleapis.com/auth/calendar',
        );

        const calendar = google.calendar({
            version: 'v3',
            auth: jwtClient,
        });

        const appointment = req.body;
        const prepareDate = dayjs(appointment.date).format('YYYY-MM-DD');

        const event = {
            summary: appointment.fullName,
            start: {
                dateTime: `${prepareDate}T${appointment.startTime}:00`,
                timeZone: 'Asia/Tbilisi',
            },
            end: {
                dateTime: `${prepareDate}T${appointment.endTime}:00`,
                timeZone: 'Asia/Tbilisi',
            },
        };

        const { data } = await calendar.events.insert({
            calendarId: process.env.CALENDAR_ID,
            auth: jwtClient,
            requestBody: event,
        });

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({
            error,
        });
    }
}
