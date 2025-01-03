import React, { FC } from 'react';
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react';
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
import cn from 'classnames';
import Image from 'next/image';
import { useScreenDetector } from '~shared/hooks/responsive';
import { Fancybox } from '~shared/ui';
import s from './ParallaxGallery.module.scss';

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

export const ParallaxGallery: FC<ParallaxGalleryProps> = ({
    slides,
    className,
    ...props
}) => {
    const { isMobile, isSmallMobile } = useScreenDetector();

    const isMobileOrTablet = isMobile || isSmallMobile;

    const slidesActive = slides?.filter((slide) => slide.active);

    return (
        <Flex
            style={{
                userSelect: 'none',
                boxSizing: 'border-box',
                flexGrow: '2',
            }}
            className={cn(s.wrapper, className)}
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
                    initialSlide={Math.floor((slidesActive.length - 1) / 2)}
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
                                key={slide?.id}
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
                                            <Image
                                                className="slide-img"
                                                src={`${slide.base64 || slide.img}`}
                                                alt={slide.title || ''}
                                                aria-label={slide.title || ''}
                                                style={{
                                                    height: isMobileOrTablet
                                                        ? '40vh'
                                                        : '50vh',
                                                }}
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
