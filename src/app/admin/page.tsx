import dynamic from 'next/dynamic';

const AdminAppDynamic = dynamic(() => import('./admin-app'), {
    ssr: false,
});

export default function Admin() {
    return <AdminAppDynamic />;
}
