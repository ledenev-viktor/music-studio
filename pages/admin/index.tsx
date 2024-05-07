import { ReactElement } from 'react';
import dynamic from 'next/dynamic';
import { NextPageWithLayout } from '~types/app';

const AdminApp = dynamic(() => import('~components/wigets/admin'), {
    ssr: false,
});

const Page: NextPageWithLayout = () => <AdminApp />;

Page.getLayout = function getLayout(page: ReactElement) {
    return page;
};

export default Page;
