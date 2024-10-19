import { ReactElement } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import dynamic from 'next/dynamic';
import { NextPageWithLayout } from '~types/app';

const PageComponent = dynamic(() => import('~components/widgets/home/'), {
    ssr: false,
});

const Layout = dynamic(() => import('~components/layout'), {
    ssr: false,
});

const Page: NextPageWithLayout = () => <PageComponent />;
Page.getLayout = function getLayout(page: ReactElement) {
    return <Layout contentPadding="0 20px">{page}</Layout>;
};

export default Page;

export async function getStaticProps({ locale }: { locale: string }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, [
                'home',
                'common',
                'slider',
            ])),
        },
    };
}
