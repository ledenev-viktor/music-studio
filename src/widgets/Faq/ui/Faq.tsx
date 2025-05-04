import React, { useMemo } from 'react';
import { Collapse } from 'antd';
import { useRouter } from 'next/router';
import s from './style.module.scss';
import { Spin, Title } from '~shared/ui';
import { useGetFaq } from '~shared/hooks/faq/useGetFaq';

export const FaqWidget = () => {
    const { data: faqData, isLoading } = useGetFaq();

    const { locale } = useRouter();

    const localeKey = (locale ? locale : 'en') as LanguageKey;

    const items = useMemo(
        () =>
            faqData?.reduce<{ key: number; label: string; children: string }[]>(
                (acc, item) => {
                    const label = item?.[localeKey].question;
                    const children = item?.[localeKey].answer;

                    if (!children || children.trim() === '') return acc;

                    acc.push({
                        key: item.id,
                        label,
                        children,
                    });

                    return acc;
                },
                [],
            ),
        [faqData, localeKey],
    );

    if (isLoading) return <Spin />;

    if (!items?.length) return null;

    return (
        <div className={s.wrapper}>
            <Title>Частые вопросы</Title>
            <Collapse className={s.collapse} items={items} />
        </div>
    );
};
