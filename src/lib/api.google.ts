/* eslint-disable @typescript-eslint/no-var-requires */
import { google } from 'googleapis';

const createGoogleClient = () => {
    const clientEmail = process.env.CLIENT_EMAIL;
    const privateKey = process.env
        .PRIVATE_KEY!.split(String.raw`\n`)
        .join('\n');

    // in case normal way is not working add credential.json to the root of the project
    // and uncomment the block
    // const jwtClient = new google.auth.JWT({
    //     keyFile: 'credentials.json',
    //     scopes: ['https://www.googleapis.com/auth/calendar'],
    // });
    const jwtClient = new google.auth.JWT(
        clientEmail,
        undefined,
        privateKey,
        'https://www.googleapis.com/auth/calendar',
        undefined,
    );

    return jwtClient;
};

export default createGoogleClient;
