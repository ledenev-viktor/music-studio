import React from 'react';
import { Flex, Input, AutoComplete, Checkbox } from 'antd';
import { useMotionValue, Reorder } from 'framer-motion';
import { Close } from '~components/ui/icons/close';
import { useRaisedShadow } from './hooks/useRaisedShadow';
const { TextArea } = Input;

export const Item = ({
    slide,
    handleOkRemove,
    imageOptions,
    changeSlide,
}: any) => {
    const y = useMotionValue(0);
    const boxShadow = useRaisedShadow(y);

    return (
        <Reorder.Item
            key={slide.id}
            value={slide}
            id={slide.img}
            style={{ boxShadow, y }}
        >
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
                                const currentOption = imageOptions?.find(
                                    (option: { value: string }) =>
                                        option.value === inputValue,
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
        </Reorder.Item>
    );
};
