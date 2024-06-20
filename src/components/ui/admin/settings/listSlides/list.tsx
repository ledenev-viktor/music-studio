import React from 'react';
import { Button, Flex, Typography } from 'antd';
import styled from '@emotion/styled';
import { Reorder } from 'framer-motion';
import { COLORS } from '~variables';
import { Slide } from './types';
import { useControlSlides } from './hooks/useControlSlides';
import { useCreateImageOptions } from './hooks/useCreateImageOptions';
import { Item } from './item';

const ListSlidesBase = ({ className }: { className?: string }) => {
    const {
        slides,
        handleAddSlide,
        handleSaveSlides,
        handleResetSlides,
        handleOkRemove,
        changeSlide,
        isChangedSlides,
        setSlides,
    } = useControlSlides();

    const imageOptions = useCreateImageOptions();

    return (
        <Flex
            vertical
            className={className}
            style={{
                maxWidth: '1365px',
                width: '100%',
                margin: '0 auto',
                background: COLORS.white,
                padding: '25px',
                borderRadius: '8px',
                marginTop: '15px',
            }}
        >
            <Flex
                style={{
                    position: 'sticky',
                    top: '64px',
                    background: COLORS.white,
                    zIndex: 3,
                }}
                gap={10}
                justify="space-between"
                align="center"
            >
                <Flex vertical>
                    <Typography.Title level={2}>
                        Slider on the main page
                    </Typography.Title>
                </Flex>
                {isChangedSlides && (
                    <Flex gap={10} style={{ background: COLORS.white }}>
                        <Button onClick={handleResetSlides}>Сбросить</Button>
                        <Button onClick={handleSaveSlides}>Сохранить</Button>
                    </Flex>
                )}
            </Flex>
            <Reorder.Group
                style={{
                    margin: 0,
                    padding: 0,
                    listStyle: 'none',
                }}
                className="slides-list"
                axis="y"
                onReorder={setSlides}
                values={slides}
            >
                {slides?.map((slide: Slide) => {
                    return (
                        <Item
                            key={slide.id}
                            slide={slide}
                            handleOkRemove={handleOkRemove}
                            imageOptions={imageOptions}
                            changeSlide={changeSlide}
                        />
                    );
                })}
            </Reorder.Group>
            <Button onClick={handleAddSlide}>Add a slide</Button>
        </Flex>
    );
};

export const ListSlides = styled(ListSlidesBase)`
    .list-item-inner {
        width: 100%;
        position: relative;
        width: 100%;
        gap: 15px;
        padding: 35px 50px 24px 24px;
        background: ${COLORS.white};
        border-radius: 8px;
        transition: all 0.3s ease;
        border: 1px solid ${COLORS.white};

        &:hover {
            border-color: ${COLORS.blueHovered};

            & .close-button {
                opacity: 1;
            }
        }
    }

    .close-button {
        & {
            border: none;
            outline: none;
            background: none;
            padding: 5px;
            border-radius: 5px;
            margin: 0;
            line-height: 0;
            cursor: pointer;
            transition: all 0.3s ease;
            color: ${COLORS.black};
            opacity: 0;

            &:hover {
                background: ${COLORS.red};
                color: ${COLORS.white};
            }
        }
        &-wrapper {
            position: absolute;
            top: 10px;
            right: 10px;
        }
    }

    & .imgbox {
        min-width: 210px;
        text-align: center;
        pointer-events: none;

        & img {
            width: auto;
            height: 100%;
            object-fit: contain;
            max-height: 140px;
            border-radius: 10px;
            max-width: 210px;
            border-radius: 8px;
            overflow: hidden;
        }
    }

    .list-inputs {
        flex-grow: 2;
        gap: 10px;

        & .ant-select,
        & input,
        & textarea {
            width: 100%;
        }
        & textarea {
            resize: none;
        }
    }
`;
