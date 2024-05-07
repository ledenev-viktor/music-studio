import { useState } from 'react';
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
import { Global } from '@emotion/react';
import { NotificationProvider } from '~notifications';
import { ModalProvider } from '~modals';
import { AppPropsWithLayout } from '~types/app';
import { globalStyles } from 'src/styles/global-styles';
import { RootLayout } from '../src/layouts/root-layout';

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

    const getLayout =
        Component.getLayout || ((page) => <RootLayout>{page}</RootLayout>);

    return (
        <QueryClientProvider client={queryClient}>
            <HydrationBoundary state={pageProps.dehydratedState}>
                <Head>
                    <title>Praktika</title>
                </Head>
                <SessionProvider session={session}>
                    <ModalProvider>
                        <NotificationProvider>
                            <Global styles={globalStyles} />
                            {getLayout(<Component {...pageProps} />)}
                        </NotificationProvider>
                    </ModalProvider>
                </SessionProvider>
            </HydrationBoundary>
            <ReactQueryDevtools />
        </QueryClientProvider>
    );
};

export default appWithTranslation(MyApp);
