import { useState } from 'react';
import Head from 'next/head';
import {
    HydrationBoundary,
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { SessionProvider } from 'next-auth/react';
import { Global } from '@emotion/react';
import { AppPropsWithLayout } from '~types/app';
import { globalStyles } from 'src/styles/global-styles';
import { RootLayout } from '../src/layouts/root-layout';

const MyApp = ({
    Component,
    pageProps: { session, ...pageProps },
}: AppPropsWithLayout) => {
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

    const getLayout =
        Component.getLayout || ((page) => <RootLayout>{page}</RootLayout>);

    return (
        <QueryClientProvider client={queryClient}>
            <HydrationBoundary state={pageProps.dehydratedState}>
                <Head>
                    <title>Praktika</title>
                </Head>
                <SessionProvider session={session}>
                    <Global styles={globalStyles} />
                    {getLayout(<Component {...pageProps} />)}
                </SessionProvider>
            </HydrationBoundary>
            <ReactQueryDevtools />
        </QueryClientProvider>
    );
};

export default MyApp;
