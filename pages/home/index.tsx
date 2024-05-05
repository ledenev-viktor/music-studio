import dynamic from 'next/dynamic';

const RegForm = dynamic(() => import('~components/wigets/registration'), {
    ssr: false,
});

export default function Page() {
    return <RegForm />;
}
