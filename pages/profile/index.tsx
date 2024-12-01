import { ReactElement } from 'react';
import dynamic from 'next/dynamic';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { NextPageWithLayout } from '~types/app';

const ProfileAvatar = dynamic(
    () => import('~components/widgets/ProfileAvatar'),
    {
        ssr: false,
    },
);

const Page: NextPageWithLayout = () => <ProfileAvatar />;

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
