'use client';
import React from 'react';
import { Flex } from 'antd';
import { Benefits } from '~ui/home';
import { COLORS } from '~variables';
import { ParallaxGallery } from '~components/ui/home/parallax-gallery';
import { slides } from './mockSlides';

const HomePage = () => {
    return (
        <Flex
            vertical
            justify="center"
            align="center"
            style={{
                padding: '0',
                height: '100vh',
                transition: 'all 1s ease',
                background: COLORS.blue,
            }}
        >
            <ParallaxGallery slides={slides} />
            <Benefits />
        </Flex>
    );
};

export default HomePage;
