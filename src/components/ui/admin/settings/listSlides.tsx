/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import {
    Button,
    Flex,
    Input,
    List,
    AutoComplete,
    Checkbox,
    Typography,
} from 'antd';
import styled from '@emotion/styled';
import isEqual from 'lodash/isEqual';
import { COLORS } from '~variables';
import { useGetImages } from '~hooks/images';
import {
    useGetSettingsPreview,
    useUpdateSettingsPreview,
} from '~hooks/settings_preview';
import { Close } from '~components/ui/icons/close';
const { TextArea } = Input;

type Slide = {
    id: number;
    img?: string;
    title?: string;
    desc?: string;
    active: boolean;
    base64: string;
};

const useControlSlides = () => {
    const { data: slidesData } = useGetSettingsPreview();
    const { mutate: updateSettingsPreview } = useUpdateSettingsPreview();
    const [slides, setSlides] = useState<Slide[]>([]);

    useEffect(() => {
        if (!slidesData?.length) return;

        return setSlides(slidesData);
    }, [slidesData]);

    const handleAddSlide = () => {
        setSlides((prev: Slide[]) => [
            ...prev,
            {
                id: prev.length + 1,
                img: '',
                title: '',
                desc: '',
                base64: '',
                active: false,
            },
        ]);
    };

    const handleSaveSlides = () => {
        updateSettingsPreview(slides);
    };

    const handleResetSlides = () => {
        if (!slidesData?.length) return;

        setSlides(slidesData);
    };

    const handleOkRemove = (id: number) => {
        if (slides.length < 1) return;
        setSlides(slides?.filter((slide: { id: number }) => slide.id !== id));
    };

    const changeSlide = (id: number, objProperty: any) => {
        setSlides((prev: Slide[]) =>
            prev.map((el) =>
                el.id === id
                    ? {
                          ...el,
                          ...objProperty,
                      }
                    : el,
            ),
        );
    };

    const [isChangedSlides, setIsChangedSlides] = useState(false);
    useEffect(() => {
        if (!isEqual(slidesData, slides)) setIsChangedSlides(true);
        else setIsChangedSlides(false);
    }, [slides, slidesData]);

    return {
        slides,
        handleAddSlide,
        handleSaveSlides,
        handleResetSlides,
        handleOkRemove,
        changeSlide,
        isChangedSlides,
    };
};

const useCreateImageOptions = () => {
    const { data: images } = useGetImages();

    return images?.map((image) => {
        return {
            label: <img src={image.url} alt="" />,
            value: image.url,
            base64: image.base64,
        };
    });
};

const ListSlidesBase = ({ className }: { className?: string }) => {
    const {
        slides,
        handleAddSlide,
        handleSaveSlides,
        handleResetSlides,
        handleOkRemove,
        changeSlide,
        isChangedSlides,
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
            <List
                itemLayout="horizontal"
                dataSource={slides}
                renderItem={(slide: Slide) => (
                    <List.Item>
                        <Flex className="list-item-inner">
                            <div className="close-button-wrapper">
                                <button
                                    className="close-button"
                                    onClick={() => handleOkRemove(slide.id)}
                                >
                                    <Close width={18} hanging={18} />
                                </button>
                            </div>
                            <div className="imgbox">
                                {/* TODO: convert to Image Nextjs */}
                                <img
                                    src={slide.img || '/logo.png'}
                                    width={150}
                                    height={80}
                                    alt={slide.title || ''}
                                />
                            </div>
                            <Flex className="list-inputs" vertical>
                                <div>
                                    <AutoComplete
                                        options={imageOptions}
                                        placeholder="The path to the image"
                                        value={slide.img || ''}
                                        onChange={(inputValue) => {
                                            const currentOption =
                                                imageOptions?.find(
                                                    (option) =>
                                                        option.value ===
                                                        inputValue,
                                                );
                                            changeSlide(slide.id, {
                                                img: inputValue,
                                                base64: currentOption?.base64,
                                            });
                                        }}
                                    />
                                </div>
                                <div>
                                    <Input
                                        value={slide.title}
                                        onChange={(e) => {
                                            changeSlide(slide.id, {
                                                title: e.target.value,
                                            });
                                        }}
                                        placeholder="Title"
                                    />
                                </div>
                                <div>
                                    <TextArea
                                        value={slide.desc}
                                        onChange={(e) => {
                                            changeSlide(slide.id, {
                                                desc: e.target.value,
                                            });
                                        }}
                                        placeholder="Description"
                                    />
                                </div>
                                <div>
                                    <Checkbox
                                        checked={slide.active}
                                        onChange={(e) => {
                                            changeSlide(slide.id, {
                                                active: e.target.checked,
                                            });
                                        }}
                                    >
                                        Active
                                    </Checkbox>
                                </div>
                            </Flex>
                        </Flex>
                    </List.Item>
                )}
            />
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
