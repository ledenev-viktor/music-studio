import React from 'react';
import { Flex } from 'antd';
import { COLORS } from '~variables';
import { useGetSettingsBase64 } from '~hooks/settings';
import { Spin } from '~ui';
import { Benefits } from '~components/home';
import { ParallaxGallery } from '~components/home/parallax-gallery';

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
