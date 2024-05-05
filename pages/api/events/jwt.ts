/* eslint-disable @typescript-eslint/no-var-requires */
import { google } from 'googleapis';
import googleConfig from '~lib/google';

const jwtClient = new google.auth.JWT(
    googleConfig.clientEmail,
    undefined,
    googleConfig.privateKey,
    'https://www.googleapis.com/auth/calendar',
    undefined,
);

export default jwtClient;
