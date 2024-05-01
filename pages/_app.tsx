import { useState } from 'react';
import { type AppProps } from 'next/app';
import Head from 'next/head';
import {
    HydrationBoundary,
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const MyApp = ({
    Component,
    pageProps: { ...pageProps },
}: AppProps<{
    dehydratedState: unknown;
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
                <Component {...pageProps} />
            </HydrationBoundary>
            <ReactQueryDevtools />
        </QueryClientProvider>
    );
};

export default MyApp;
