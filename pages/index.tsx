import { type GetServerSideProps, type NextPage } from 'next';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import HomePage from './home';

const Home: NextPage = () => <HomePage />;

export const getServerSideProps: GetServerSideProps = async () => {
    const supabase = createServerComponentClient({ cookies });

    const {
        data: { session },
    } = await supabase.auth.getSession();

    if (!session)
        return {
            redirect: {
                destination: '/home',
                permanent: false,
            },
        };

    return {
        props: {
            initialSession: session,
            user: session.user,
        },
    };
};

export default Home;
