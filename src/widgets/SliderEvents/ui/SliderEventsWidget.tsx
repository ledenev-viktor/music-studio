import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { SlideFieldsWithId, SliderEvents } from '~features/events';
import s from './SliderEventsWidget.module.scss';
import { Spin, Title } from '~shared/ui';
import { useGetSlides } from '~shared/hooks/slides/useGetSlides';

export const SliderEventsWidget = () => {
    const { locale } = useRouter();
    const { data: slidesData, isLoading } = useGetSlides();

    const localeKey = (locale ? locale : 'en') as LanguageKey;

    const items = useMemo(
        () =>
            slidesData?.reduce<SlideFieldsWithId[]>((acc, item) => {
                const img = item?.[localeKey].img;
                const desc = item?.[localeKey].desc;
                const price = item?.[localeKey].price;
                const title = item?.[localeKey].title;
                const active = item?.[localeKey].active;

                if (!img || img.trim() === '') return acc;

                acc.push({
                    id: item.id,
                    desc,
                    price,
                    title,
                    active,
                    img,
                });

                return acc;
            }, []),
        [slidesData, localeKey],
    );

    if (isLoading) return <Spin />;

    if (!items?.length) return null;

    return (
        <div className={s.wrapper}>
            <Title>Наши ближайшие события</Title>
            <SliderEvents slides={items} />
        </div>
    );
};
