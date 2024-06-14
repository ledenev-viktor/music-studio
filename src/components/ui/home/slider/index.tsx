import React, { FC } from 'react';
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react';
import styled from '@emotion/styled';
import Image from 'next/image';
import { Pagination, A11y, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { COLORS } from '~variables';

type Slide = { id: number; path: string };
type MainSliderBaseProps = {
    slides: Slide[];
    className?: string;
} & SwiperProps;

const MainSliderBase: FC<MainSliderBaseProps> = ({
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
            className={className}
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
                <SwiperSlide key={slide.id}>
                    <Image
                        width={1200}
                        height={500}
                        style={{
                            maxWidth: '100%',
                            objectFit: 'cover',
                        }}
                        src={`/${slide.path}`}
                        alt={`slider-image-${slide.id}`}
                    />
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export const MainSlider = styled(MainSliderBase)`
    width: 100vw;
    margin: 0;
    box-sizing: border-box;
    overflow: hidden;

    .wrapper {
        max-width: 1200px;
        width: 100%;
        box-sizing: border-box;
        margin: 0 auto;
    }

    .swiper-slide {
        opacity: 0.5;
        line-height: 0;
        transition: opacity 1s ease;
        &.swiper-slide-active {
            opacity: 1;
            &:before {
                display: none;
            }
        }
    }

    .swiper-pagination-bullet {
        border-radius: 0;
        width: 30px;
        height: 4px;

        &.swiper-pagination-bullet-active {
            background: ${COLORS.blue};
        }
    }
`;
