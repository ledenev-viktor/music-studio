import 'swiper/css';
import 'swiper/css/bundle';
import 'swiper/css/effect-cards';
import { Autoplay, EffectCards, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperInstance } from 'swiper';
import styled from '@emotion/styled';
import { SlideWithBase64 } from '~types/settings';
import { GalleryCard } from './GalleryCard';
import { BREAKPOINTS } from '~constants/breakpoints';

export const Gallery = ({ slides }: { slides: SlideWithBase64[] }) => {
    SwiperInstance.use([Autoplay]);

    return (
        <>
            <MobileSlider
                effect="cards"
                grabCursor
                modules={[EffectCards, Autoplay]}
                cardsEffect={{
                    rotate: false,
                    slideShadows: false,
                    perSlideOffset: 9,
                }}
                loop
                centeredSlides
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: true,
                }}
            >
                {slides.map((slide) => (
                    <SwiperSlide key={slide.id}>
                        <GalleryCard slide={slide} />
                    </SwiperSlide>
                ))}
            </MobileSlider>
            <DesktopSlider
                effect="cards"
                loop
                centeredSlides
                cardsEffect={{
                    rotate: false,
                    slideShadows: false,
                    perSlideOffset: 9,
                }}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination, Autoplay, EffectCards]}
                spaceBetween={16}
                speed={1000}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: true,
                }}
            >
                {slides.map((slide) => (
                    <SwiperSlide key={slide.id}>
                        <GalleryCard slide={slide} />
                    </SwiperSlide>
                ))}
            </DesktopSlider>
        </>
    );
};

const MobileSlider = styled(Swiper)`
    display: none;

    @media screen and (max-width: ${BREAKPOINTS.mobile}) {
        display: block;
        width: 100%;
        height: 410px;
        padding: 30px;
    }
`;

const DesktopSlider = styled(Swiper)`
    display: block;
    width: 100%;
    padding: 20px 150px 30px;

    @media screen and (max-width: ${BREAKPOINTS.mobile}) {
        display: none;
    }
`;
