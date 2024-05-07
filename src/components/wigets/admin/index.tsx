'use client';
import React, { Suspense } from 'react';
import { signOut } from 'next-auth/react';
import { Flex, Spin } from 'antd';
import { useGetAppointments } from '~hooks/appointments';

// needs to be default import for dynamic loading
export default function AdminApp() {
    const { data: appointments } = useGetAppointments();

    return (
        <Suspense fallback={<Spin size="large" />}>
            <Flex vertical gap="20px">
                <div>admin page</div>
                <>{JSON.stringify(appointments)}</>
                <button onClick={() => signOut({ callbackUrl: '/home' })}>
                    Sign out
                </button>
            </Flex>
        </Suspense>
    );
}
