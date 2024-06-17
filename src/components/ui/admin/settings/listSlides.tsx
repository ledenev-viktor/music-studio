/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import { Button, Flex, Input, List, AutoComplete } from 'antd';
import styled from '@emotion/styled';
import { COLORS } from '~variables';
import { useGetImages } from '~hooks/images';
import { Modal } from '~components/ui/modal';
const { TextArea } = Input;

type Slide = {
    id: number;
    img?: string;
    title?: string;
    desc?: string;
};

const data = [
    {
        id: 1,
        img: '/parallax-gallery/1.webp',
        title: 'Ant Design Title 1',
        desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque laborum rerum nostrum officiis nesciunt possimus laboriosam animi quasi? Dolorum voluptatibus cupiditate iusto tempora qui voluptatem ad, repudiandae odio officiis assumenda!',
    },
];

const useRemoveSlide = (methodRemove: React.Dispatch<any>, slides: Slide[]) => {
    const [isModalOpenRemove, setIsModalOpenRemove] = useState(false);

    const showModalRemove = () => {
        setIsModalOpenRemove(true);
    };

    const handleOkRemove = (id: number) => {
        if (slides.length < 1) return;

        methodRemove(
            slides?.filter((slide: { id: number }) => slide.id !== id),
        ),
            setIsModalOpenRemove(false);
    };

    const handleCancelRemove = () => {
        setIsModalOpenRemove(false);
    };

    return {
        isModalOpenRemove,
        showModalRemove,
        handleOkRemove,
        handleCancelRemove,
    };
};

const ListSlidesBase = ({ className }: { className: string }) => {
    const [slides, setSlides] = useState<any>(data);
    const handleAddSlide = () => {
        setSlides((prev: any) => [
            ...prev,
            { id: prev.length + 1, img: '', title: '', desc: '' },
        ]);
    };

    console.log('slides', slides);

    const {
        isModalOpenRemove,
        showModalRemove,
        handleOkRemove,
        handleCancelRemove,
    } = useRemoveSlide(setSlides, slides);

    const { data: images } = useGetImages();
    console.log('images', images);

    const optionImages = images?.map((image) => {
        return {
            value: <img key={image.url} src={image.url} alt="" />,
        };
    });

    return (
        <Flex
            vertical
            className={className}
            style={{ maxWidth: '1365px', width: '100%', margin: '0 auto' }}
        >
            <List
                itemLayout="horizontal"
                dataSource={slides}
                renderItem={(item) => (
                    <List.Item>
                        <Modal
                            title="Basic Modal"
                            open={isModalOpenRemove}
                            onOk={() => handleOkRemove(item.id)}
                            onCancel={handleCancelRemove}
                        >
                            Вы действительно хотите удалить слайд?
                        </Modal>
                        <Flex className="list-item-inner">
                            <div className="close-button-wrapper">
                                <button
                                    className="close-button"
                                    onClick={showModalRemove}
                                >
                                    <svg
                                        width="18"
                                        height="18"
                                        viewBox="0 0 18 18"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M1.71143e-08 16.1422L16.1421 1.3374e-05L17.5564 1.41423L1.41421 17.5564L1.71143e-08 16.1422Z"
                                            fill="currentColor"
                                        />
                                        <path
                                            d="M1.41406 6.10523e-05L17.5562 16.1422L16.142 17.5564L-0.000151038 1.41427L1.41406 6.10523e-05Z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                </button>
                            </div>
                            <div className="imgbox">
                                <img
                                    src={item.img || '/logo.png'}
                                    width={150}
                                    height={80}
                                    alt={item.title || ''}
                                />
                            </div>
                            <Flex className="list-inputs" vertical>
                                <div>
                                    <AutoComplete
                                        options={optionImages}
                                        placeholder="Путь до картинки"
                                        value={item.img || ''}
                                        onChange={(inputValue) => {
                                            console.log(
                                                'inputValue',
                                                inputValue,
                                            );
                                            setSlides((prev) =>
                                                prev.map((el) =>
                                                    el.id === item.id
                                                        ? {
                                                              ...el,
                                                              img: inputValue,
                                                          }
                                                        : el,
                                                ),
                                            );
                                        }}
                                        filterOption={(inputValue, option) => {
                                            console.log('option', option);
                                            return false;
                                        }}
                                    />
                                </div>
                                <div>
                                    <Input
                                        value={item.title}
                                        onChange={(e) => {
                                            console.log(item.id);
                                            setSlides((prev) =>
                                                prev.map((el) => {
                                                    return el.id === item.id
                                                        ? {
                                                              ...el,
                                                              title: e.target
                                                                  .value,
                                                          }
                                                        : el;
                                                }),
                                            );
                                        }}
                                        placeholder="Заголовок"
                                    />
                                </div>
                                <div>
                                    <TextArea
                                        value={item.desc}
                                        onChange={(e) => {
                                            setSlides((prev) =>
                                                prev.map((el) =>
                                                    el.id === item.id
                                                        ? {
                                                              ...el,
                                                              desc: e.target
                                                                  .value,
                                                          }
                                                        : el,
                                                ),
                                            );
                                        }}
                                        placeholder="Описание"
                                    />
                                </div>
                            </Flex>
                        </Flex>
                    </List.Item>
                )}
            />
            <Button onClick={handleAddSlide}>Добавить слайд</Button>
        </Flex>
    );
};

export const ListSlides = styled(ListSlidesBase)`
    .list-item-inner {
        gap: 15px;
        width: 100%;
        padding: 35px 50px 24px 24px;
        background: white;
        position: relative;
        border-radius: 8px;
        transition: all 0.3s ease;
        &:hover {
            background: ${COLORS.blueHovered};
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
            &:hover {
                background: red;
                color: #fff;
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
