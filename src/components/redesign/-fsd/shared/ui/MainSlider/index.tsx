import React, { FC } from 'react';
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import { Pagination, A11y, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import cn from 'classnames';
import s from './MainSlider.module.scss';

type Slide = { id: number; path: string };
type MainSliderBaseProps = {
    slides: Slide[];
    className?: string;
} & SwiperProps;

export const MainSlider: FC<MainSliderBaseProps> = ({
    slides,
    className,
    ...props
}) => {
    return (
        <Swiper
            spaceBetween={0}
            slidesPerView={1.6}
            pagination={{ clickable: true }}
            modules={[Pagination, A11y, Autoplay]}
            centeredSlides={true}
            loop
            className={cn(s.slider, className)}
            speed={500}
            autoplay={{
                delay: 4500,
                disableOnInteraction: false,
            }}
            breakpoints={{
                0: {
                    slidesPerView: 1,
                },
                768: {
                    slidesPerView: 1.6,
                },
            }}
            {...props}
        >
            {slides.map((slide: Slide) => (
                <SwiperSlide key={slide?.id}>
                    <Image
                        width={1200}
                        height={500}
                        style={{
                            maxWidth: '100%',
                            objectFit: 'cover',
                        }}
                        src={`/${slide.path}`}
                        alt={`slider-image-${slide.id}`}
                        priority={true}
                    />
                </SwiperSlide>
            ))}
        </Swiper>
    );
};
