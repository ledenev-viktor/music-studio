'use client';
import React from 'react';
import { Flex } from 'antd';
import { MainSlider, Benefits } from '~ui/home';

const HomePage = () => {
    const slides = [
        {
            id: 2,
            path: 'cat2.webp',
        },
        {
            id: 3,
            path: 'cat3.webp',
        },
        {
            id: 4,
            path: 'cat2.webp',
        },
        {
            id: 5,
            path: 'cat3.webp',
        },
    ];

    return (
        <Flex
            vertical
            justify="center"
            align="center"
            style={{ padding: '0', height: `calc(100vh - 140px)` }}
        >
            <Flex style={{ height: '500px' }}>
                <MainSlider
                    slides={slides}
                    autoplay={{
                        delay: 7500,
                        disableOnInteraction: false,
                    }}
                    speed={1000}
                />
            </Flex>
            <Benefits />
        </Flex>
    );
};
export default HomePage;
