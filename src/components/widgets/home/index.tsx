'use client';
import React from 'react';
import { Flex } from 'antd';
import { Benefits } from '~ui/home';
import { COLORS } from '~variables';
import { useGetSettingsPreview } from '~hooks/settings_preview';
import { ParallaxGallery } from '~components/ui/home/parallax-gallery';

const HomePage = () => {
    const { data: slidesData, isLoading: isLoadingSlidesData } =
        useGetSettingsPreview();

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
            {!isLoadingSlidesData && (
                <ParallaxGallery slides={slidesData || []} />
            )}
            <Benefits />
        </Flex>
    );
};

export default HomePage;
