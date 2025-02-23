import React, { useMemo } from 'react';
import { Collapse } from 'antd';
import s from './style.module.scss';
import { Spin, Title } from '~shared/ui';
import { useGetFaq } from '~shared/hooks/faq/useGetFaq';

export const FaqWidget = () => {
    const { data: faqData, isLoading } = useGetFaq();

    const items = useMemo(
        () =>
            faqData?.map((item) => ({
                key: item.id,
                label: item.question,
                children: item.answer,
            })),
        [faqData],
    );

    console.log('items', items);

    if (isLoading) return <Spin />;

    if (!items?.length) return null;

    return (
        <div className={s.wrapper}>
            <Title>Частые вопросы</Title>
            <Collapse className={s.collapse} items={items} />
        </div>
    );
};
