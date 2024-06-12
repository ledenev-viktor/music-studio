import { useState } from 'react';
import Head from 'next/head';
import {
    HydrationBoundary,
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';
import { appWithTranslation } from 'next-i18next';
import { Global } from '@emotion/react';
import dynamic from 'next/dynamic';
import { NotificationProvider } from '~notifications';
import { ModalProvider } from '~modals';
import { AppPropsWithLayout } from '~types/app';
import { globalStyles } from 'src/styles/global-styles';

const Layout = dynamic(() => import('~components/layout'), {
    ssr: false,
});

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
        Component.getLayout || ((page) => <Layout>{page}</Layout>);

    return (
        <QueryClientProvider client={queryClient}>
            <HydrationBoundary state={pageProps.dehydratedState}>
                <Head>
                    <title>Praktika</title>
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
                    />
                    <link rel="shortcut icon" href="/favicon.png" />
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
        </QueryClientProvider>
    );
};

export default appWithTranslation(MyApp);
