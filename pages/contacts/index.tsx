import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import dynamic from 'next/dynamic';

const PageComponent = dynamic(() => import('~components/widgets/contacts'), {
    ssr: false,
});

export default PageComponent;

export async function getStaticProps({ locale }: { locale: string }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, 'contacts')),
        },
    };
}
