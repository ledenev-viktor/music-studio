import React from 'react';
import { Flex } from 'antd';
import { Benefits, Spin } from '~ui/home';
import { COLORS } from '~variables';
import { useGetSettingsBase64 } from '~hooks/settings';
import { ParallaxGallery } from '~components/ui/home/parallax-gallery';

const HomePage = () => {
    const { data: slides, isLoading: isLoadingSlides } = useGetSettingsBase64();

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
            {/* !isLoadingSlides */}
            {!isLoadingSlides ? (
                <ParallaxGallery slides={slides || []} />
            ) : (
                <Flex
                    vertical
                    justify="center"
                    align="center"
                    style={{ minHeight: '150px', flexGrow: '2' }}
                >
                    <Spin />
                </Flex>
            )}
            <Benefits />
        </Flex>
    );
};

export default HomePage;
