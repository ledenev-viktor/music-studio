'use client';
import styled from '@emotion/styled';
import { Flex, Typography } from 'antd';
import Image from 'next/image';
import { COLORS } from 'src/styles/variables';
import { useMobile } from '~hooks/responsive';

const { white } = COLORS;
type MainBannerBaseProps = {
    className: string;
    src: string;
    text: string;
    shortText: string;
};
const MainBannerBase = ({
    className,
    src,
    text,
    shortText,
}: MainBannerBaseProps) => {
    const { Title, Text } = Typography;
    const isMobile = useMobile();
    return (
        <Flex className={className} justify="space-between">
            <Flex className="main-banner-column">
                <Image
                    className="main-banner-image"
                    src={src}
                    alt="music studio"
                />
                {isMobile && shortText && (
                    <Text className="main-banner-shorttext">{shortText}</Text>
                )}
            </Flex>
            {!isMobile && (
                <Flex className="main-banner-column">
                    <Title className="main-banner-title" level={2}>
                        {text}
                    </Title>
                </Flex>
            )}
        </Flex>
    );
};

export const MainBanner = styled(MainBannerBase)`
    padding: 50px;
    align-items: center;
    gap: 30px;
    @media screen and (max-width: 1239px) {
        padding: 50px 0;
    }
    @media screen and (max-width: 767px) {
        flex-direction: column;
        gap: 0;
    }
    @media screen and (max-width: 490px) {
        margin: 0 -20px;
    }
    .main-banner {
        &-column {
            &:first-child {
                width: 300px;
                flex-shrink: 0;
                @media screen and (max-width: 1239px) {
                    width: 200px;
                }
                @media screen and (max-width: 767px) {
                    width: 100%;
                    max-width: 450px;
                }
                @media screen and (max-width: 490px) {
                    max-width: 320px;
                }
            }
            &:last-child {
                width: 100%;
            }
        }

        &-image {
            width: 100%;
            height: 100%;
        }

        &-title {
            font-size: 24px;

            @media screen and (max-width: 1239px) {
                font-size: 20px;
            }
        }

        &-shorttext {
            position: absolute;
            max-width: 80px;
            bottom: 39px;
            left: 50%;
            margin-left: -95px;
            color: ${white};
            font-size: 12px;

            @media screen and (max-width: 490px) {
                max-width: 70px;
                bottom: 110px;
                left: 50%;
                margin-left: -70px;
                font-size: 11px;
            }
        }
    }
`;
