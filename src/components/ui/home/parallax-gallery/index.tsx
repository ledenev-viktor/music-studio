/* eslint-disable @next/next/no-img-element */
import React, { FC, useState } from 'react';
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
import { Modal } from '~components/ui/modal';

SwiperCore.use([
    Parallax,
    Pagination,
    Mousewheel,
    FreeMode,
    Autoplay,
    Controller,
]);

type Slide = {
    id: number;
    path: string;
    modal?: {
        title?: string;
        description?: string;
    };
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

    const [isModalOpen, setIsModalOpen] = useState({ open: false, id: 0 });

    const showModal = (id: number) => {
        setIsModalOpen({ open: true, id: id });
    };

    const handleCancel = () => {
        setIsModalOpen((prev) => ({ ...prev, open: false }));
    };

    const currentSlide = slides.find((slide) => slide.id === isModalOpen.id);

    return (
        <Flex
            style={{
                userSelect: 'none',
                boxSizing: 'border-box',
            }}
            className={className}
            vertical
        >
            <Swiper
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
                {slides.map((slide: Slide, index: number) => (
                    <SwiperSlide
                        onClick={() => showModal(slide.id)}
                        className="slide-item"
                        key={slide.id}
                        style={{
                            cursor: slide.modal ? 'pointer' : 'default',
                        }}
                    >
                        <div
                            className="slide-content"
                            data-swiper-parallax={`${index % 2 === 0 ? '35%' : '25%'}`}
                        >
                            <div className="slide-imgbox">
                                <img
                                    className="slide-img"
                                    src={`/${slide.path}`}
                                    style={{
                                        height:
                                            isMobile || isSmallMobile
                                                ? '40vh'
                                                : '50vh',
                                    }}
                                    alt={slide?.modal?.title || ''}
                                />
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            {currentSlide?.modal && (
                <Modal
                    open={isModalOpen.open}
                    onCancel={handleCancel}
                    footer={null}
                >
                    {currentSlide?.modal?.title && (
                        <h2>{currentSlide?.modal.title}</h2>
                    )}
                    {currentSlide?.modal?.description && (
                        <p>{currentSlide?.modal.description}</p>
                    )}
                </Modal>
            )}
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
