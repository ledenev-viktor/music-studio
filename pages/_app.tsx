import { useState } from 'react';
import Head from 'next/head';
import {
    HydrationBoundary,
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AppPropsWithLayout } from '~types/app';
import { RootLayout } from '../src/layouts/root-layout';

const MyApp = ({
    Component,
    pageProps: { ...pageProps },
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
                {getLayout(<Component {...pageProps} />)}
            </HydrationBoundary>
            <ReactQueryDevtools />
        </QueryClientProvider>
    );
};

export default MyApp;
