import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import dynamic from 'next/dynamic';
import { NextPageWithLayout } from '~types/app';

const PageComponent = dynamic(() => import('~components/widgets/home/'), {
    ssr: false,
});

const Page: NextPageWithLayout = () => <PageComponent />;
export default Page;

export async function getStaticProps({ locale }: { locale: string }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
        },
    };
}
