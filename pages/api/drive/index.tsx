import { google } from 'googleapis';
import jwtClient from '../jwt';

export const drive = google.drive({
    version: 'v3',
    auth: jwtClient,
});
