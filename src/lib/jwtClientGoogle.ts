import { google } from 'googleapis';
import googleConfig from './google';

export const jwtClientGoogle = (scopes: string) =>
    new google.auth.JWT(
        googleConfig.clientEmail,
        undefined,
        googleConfig.privateKey,
        scopes,
        undefined,
    );
