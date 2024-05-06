import NextAuth, { AuthOptions, Account, Profile } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import googleConfig from '~lib/google';

export const authOptions: AuthOptions = {
    secret: googleConfig.secret,
    providers: [
        GoogleProvider({
            clientId: googleConfig.clientId,
            clientSecret: googleConfig.clientSecret,
            authorization: {
                params: {
                    prompt: 'consent',
                    access_type: 'offline',
                    response_type: 'code',
                },
            },
        }),
    ],
    callbacks: {
        async signIn({
            account,
            profile,
        }: {
            account: Account | null;
            profile?: Profile;
        }) {
            if (!account || !profile) return false;
            if (
                account.provider === 'google' &&
                profile.email === googleConfig.calendarId
            ) {
                return true;
            }
            return false;
        },
    },
};
export default NextAuth(authOptions);
