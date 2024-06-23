/* eslint-disable @next/next/no-img-element */
import React, { FC } from 'react';
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react';
import styled from '@emotion/styled';
import {
    Pagination,
    Parallax,
    Autoplay,
    Mousewheel,
    FreeMode,
    Controller,
} from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Flex } from 'antd';
import { useScreenDetector } from '~hooks/responsive';
import { Fancybox } from '~components/ui/fancybox';

SwiperCore.use([
    Parallax,
    Pagination,
    Mousewheel,
    FreeMode,
    Autoplay,
    Controller,
]);

type Slide = {
    base64?: string;
    id?: number;
    title?: string;
    desc?: string;
    img?: string;
    active?: boolean;
};
type ParallaxGalleryProps = {
    slides: Slide[];
    className?: string;
} & SwiperProps;

const ParallaxGalleryBase: FC<ParallaxGalleryProps> = ({
    slides,
    className,
    ...props
}) => {
    const { isMobile, isSmallMobile } = useScreenDetector();

    const slidesActive = slides?.filter((slide) => slide.active);

    return (
        <Flex
            style={{
                userSelect: 'none',
                boxSizing: 'border-box',
            }}
            className={className}
            vertical
        >
            <Fancybox
                options={{
                    Carousel: {
                        infinite: false,
                    },
                }}
            >
                <Swiper
                    {...props}
                    freeMode={true}
                    mousewheel={true}
                    parallax={true}
                    centeredSlides={true}
                    className="slider-main"
                    initialSlide={2}
                    breakpoints={{
                        0: {
                            slidesPerView: 1.2,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 2.5,
                            spaceBetween: 20,
                        },
                        1239: {
                            slidesPerView: 4.2,
                            spaceBetween: 10,
                        },
                    }}
                    {...props}
                >
                    {slidesActive?.map((slide: Slide, index: number) => {
                        return (
                            <SwiperSlide
                                key={slide.id}
                                className="slide-item"
                                style={{
                                    cursor:
                                        slide.title || slide.desc
                                            ? 'pointer'
                                            : 'default',
                                }}
                            >
                                <div
                                    className="slide-content"
                                    data-swiper-parallax={`${index % 2 === 0 ? '35%' : '25%'}`}
                                >
                                    <div className="slide-imgbox">
                                        <a
                                            data-fancybox="gallery"
                                            href={`${slide.base64 || slide.img}`}
                                            data-caption={`<div style="max-width:960px;width=100%;margin:0 auto;">
                                                ${slide.title ? '<h3>' + slide.title + '</h3>' : ''}
                                                ${slide.desc ? '<h3>' + slide.desc + '</h3>' : ''}
                                            </div>`}
                                        >
                                            {/* TODO: convert to Image Next.js */}
                                            <img
                                                className="slide-img"
                                                src={`${slide.base64 || slide.img}`}
                                                style={{
                                                    height:
                                                        isMobile ||
                                                        isSmallMobile
                                                            ? '40vh'
                                                            : '50vh',
                                                }}
                                                alt={slide.title || ''}
                                            />
                                        </a>
                                    </div>
                                </div>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </Fancybox>
        </Flex>
    );
};

export const ParallaxGallery = styled(ParallaxGalleryBase)`
    .slider-main {
        width: 100vw;
        padding: 20px 20px 0;
        margin: 0;
        box-sizing: border-box;
        overflow: hidden;
        will-change: transform;
    }
    .slider-bg {
        z-index: 0;
    }

    .wrapper {
        max-width: 1200px;
        width: 100%;
        box-sizing: border-box;
        margin: 0 auto;
    }
    .swiper-wrapper {
        transition: all cubic-bezier(0.2, 0.6, 0, 1) 0.5s !important;
        will-change: transform;
    }
    .slide-content {
        transition-duration: 0.5s !important;
    }
    .slide-item {
        overflow: hidden;
        border-radius: 15px;
        line-height: 0;
        transition: border-radius 0.75s ease;
        will-change: transform;

        &:hover {
            border-radius: 6px;
        }
    }
    .slide-imgbox {
    }
    .slide-img {
        width: 300%;
        object-fit: cover;
        transition: all 0.75s ease;
        transform: translateX(-50%);
        transition-duration: 0.75s !important;
    }
`;
