'use client';
import { Flex } from 'antd';
import { MainSlider } from '../slider';
import { Benefits } from '../benefits';

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
        <>
            <Flex
                vertical
                justify="center"
                align="center"
                style={{ padding: '0' }}
            >
                <MainSlider
                    slides={slides}
                    autoplay={{
                        delay: 7500,
                        disableOnInteraction: false,
                    }}
                    speed={1000}
                />
                <Benefits />
            </Flex>
        </>
    );
};
export default HomePage;
