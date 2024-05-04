import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        GoogleProvider({
            clientId: String(process.env.GOOGLE_ADMIN_CLIENT_ID),
            clientSecret: String(process.env.GOOGLE_ADMIN_CLIENT_KEY),
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
        async signIn({ account, profile }: any) {
            if (
                account.provider === 'google' &&
                profile.email === process.env.CALENDAR_ID
            ) {
                return true;
            }
            return false;
        },
    },
};
export default NextAuth(authOptions);
