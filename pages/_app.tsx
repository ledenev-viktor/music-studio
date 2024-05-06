import { useState } from 'react';
import { type AppProps } from 'next/app';
import Head from 'next/head';
import {
    HydrationBoundary,
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';
import { appWithTranslation } from 'next-i18next';

const MyApp = ({
    Component,
    pageProps: { session, ...pageProps },
}: AppProps<{
    dehydratedState: unknown;
    session: Session;
}>) => {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        refetchOnWindowFocus: false,
                    },
                },
            }),
    );

    return (
        <QueryClientProvider client={queryClient}>
            <HydrationBoundary state={pageProps.dehydratedState}>
                <Head>
                    <title>Praktika</title>
                </Head>
                <SessionProvider session={session}>
                    <Component {...pageProps} />
                </SessionProvider>
            </HydrationBoundary>
            <ReactQueryDevtools />
        </QueryClientProvider>
    );
};

export default appWithTranslation(MyApp);
