/* eslint-disable @typescript-eslint/no-var-requires */
import { google } from 'googleapis';
import { SCOPES } from '~constants/google.api';

const createGoogleClient = () => {
    const clientEmail = process.env.CLIENT_EMAIL;
    const privateKey = process.env
        .PRIVATE_KEY!.split(String.raw`\n`)
        .join('\n');

    const jwtClient = new google.auth.JWT(
        clientEmail,
        undefined,
        privateKey,
        SCOPES,
        undefined,
    );

    return jwtClient;
};

export default createGoogleClient;
