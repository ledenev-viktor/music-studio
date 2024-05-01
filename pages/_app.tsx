import { useState } from 'react';
import { type AppProps } from 'next/app';
import Head from 'next/head';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider, Session } from '@supabase/auth-helpers-react';
import {
    HydrationBoundary,
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { supabaseAnonKey, supabaseUrl } from '~utils/supabaseClient';

const MyApp = ({
    Component,
    pageProps: { ...pageProps },
}: AppProps<{
    dehydratedState: unknown;
    initialSession: Session | null | undefined;
}>) => {
    const [supabaseClient] = useState(() =>
        createClientComponentClient({
            supabaseUrl,
            supabaseKey: supabaseAnonKey,
        }),
    );

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
            <SessionContextProvider supabaseClient={supabaseClient}>
                <HydrationBoundary state={pageProps.dehydratedState}>
                    <Head>
                        <title>Praktika</title>
                    </Head>
                    <Component {...pageProps} />
                </HydrationBoundary>
                <ReactQueryDevtools />
            </SessionContextProvider>
        </QueryClientProvider>
    );
};

export default MyApp;
