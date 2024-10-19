import React from 'react';
import { Flex } from 'antd';
import { Benefits, Spin } from '~ui/home';
import { COLORS } from '~variables';
import { useGetSettingsBase64 } from '~hooks/settings';
import { useScreenDetector } from '~hooks/responsive';
import { Gallery } from '../Gallery/Gallery';

const HomePage = () => {
    const { isMobile, isSmallMobile } = useScreenDetector();
    const { data: slides, isLoading: isLoadingSlides } = useGetSettingsBase64();

    return (
        <Flex
            vertical
            justify={isMobile || isSmallMobile ? 'center' : 'space-around'}
            align="center"
            style={{
                padding: '0',
                height: '100vh',
                transition: 'all 1s ease',
                background: COLORS.blue,
            }}
        >
            {!isLoadingSlides ? (
                <Gallery slides={slides || []} />
            ) : (
                <Flex
                    vertical
                    justify="center"
                    align="center"
                    style={{ minHeight: '410px' }}
                >
                    <Spin />
                </Flex>
            )}
            <Benefits />
        </Flex>
    );
};

export default HomePage;
