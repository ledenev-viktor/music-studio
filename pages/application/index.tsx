import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { RegistrationForm } from '~components/widgets/registration';

export default function Page() {
    return <RegistrationForm />;
}

export async function getStaticProps({ locale }: { locale: string }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, [
                'application',
                'common',
            ])),
        },
    };
}
