import 'swiper/css';
import 'swiper/css/bundle';
import 'swiper/css/effect-cards';
import { Autoplay, EffectCards, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperInstance } from 'swiper';
import { SlideWithBase64 } from '~shared/types/settings';
import { GalleryCard } from './GalleryCard';
import s from './SliderEvents.module.scss';

export const SliderEvents = ({ slides }: { slides: SlideWithBase64[] }) => {
    SwiperInstance.use([Autoplay]);

    return (
        <Swiper
            className={s.slider}
            loop
            pagination={{
                clickable: true,
            }}
            slidesPerView={3}
            modules={[Pagination, Autoplay, EffectCards]}
            spaceBetween={16}
            speed={1000}
            autoplay={{
                delay: 5000,
                disableOnInteraction: true,
            }}
            breakpoints={{
                0: {
                    slidesPerView: 1,
                },
                768: {
                    slidesPerView: 2,
                },
                1024: {
                    slidesPerView: 3,
                },
            }}
        >
            {slides?.map((slide) => (
                <SwiperSlide key={slide?.id}>
                    <GalleryCard slide={slide} />
                </SwiperSlide>
            ))}
        </Swiper>
    );
};
