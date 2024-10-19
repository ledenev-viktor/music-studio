import { ReactElement } from 'react';
import dynamic from 'next/dynamic';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { NextPageWithLayout } from '~types/app';

const AdminApp = dynamic(() => import('~layout/AdminLayout'), {
    ssr: false,
});

const Page: NextPageWithLayout = () => <AdminApp />;

Page.getLayout = function getLayout(page: ReactElement) {
    return page;
};

export default Page;

export async function getStaticProps({ locale }: { locale: string }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
        },
    };
}
