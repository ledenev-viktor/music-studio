import 'swiper/css';
import 'swiper/css/bundle';
import 'swiper/css/effect-cards';
import { Autoplay, EffectCards, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperInstance } from 'swiper';
import styled from '@emotion/styled';
import { SlideWithBase64 } from '~types/settings';
import { GalleryCard } from './GalleryCard';
import s from './SliderEvents.module.scss';

export const SliderEvents = ({ slides }: { slides: SlideWithBase64[] }) => {
    SwiperInstance.use([Autoplay]);

    return (
        <>
            <div className={s.wrapper}>
                <div>
                    <h2 className={s.title}>Наши ближайшие события</h2>
                </div>
                <Slider
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
                </Slider>
            </div>
        </>
    );
};

const Slider = styled(Swiper)`
    display: block;
    width: 100%;
`;
