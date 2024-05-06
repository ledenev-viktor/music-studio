'use client';
import React, { Suspense } from 'react';
import { signOut } from 'next-auth/react';
import { Flex, Spin } from 'antd';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useGetAppointments } from '~hooks/appointments';

// needs to be default import for dynamic loading
export default function AdminApp() {
    const { data: appointments } = useGetAppointments();
    const { t } = useTranslation();
    const router = useRouter();
    const { defaultLocale, locale } = router;
    const callbackUrl = locale === defaultLocale ? '/home' : `/${locale}/home`;

    return (
        <Suspense fallback={<Spin size="large" />}>
            <Flex vertical gap="20px">
                <div>{t('admin page')}</div>
                <>{JSON.stringify(appointments)}</>
                <button onClick={() => signOut({ callbackUrl })}>
                    Sign out
                </button>
            </Flex>
        </Suspense>
    );
}
