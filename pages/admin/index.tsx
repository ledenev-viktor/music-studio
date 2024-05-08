import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const AdminApp = dynamic(() => import('~components/widgets/admin'), {
    ssr: false,
});

const Home: NextPage = () => <AdminApp />;

export default Home;

export async function getStaticProps({ locale }: { locale: string }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
        },
    };
}
