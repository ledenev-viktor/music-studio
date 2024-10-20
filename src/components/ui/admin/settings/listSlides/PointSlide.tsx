import React, { ReactNode } from 'react';
import { Flex, Input, AutoComplete, Checkbox } from 'antd';
import { useMotionValue, Reorder } from 'framer-motion';
import Image from 'next/image';
import { Slide } from '~types/settings';
import { useScreenDetector } from '~hooks/responsive';
import { Close } from '~components/ui/icons/close';
import { useRaisedShadow } from './hooks/useRaisedShadow';
import { InputMoney } from '~components/ui/hook-form';
const { TextArea } = Input;

type PointSlideProps = {
    slide: Slide;
    handleRemove: (id: number) => void;
    imageOptions?: {
        fileDownload: string;
        label: ReactNode | string;
        value: string;
    }[];
    changeSlide: (id: number, obj: Partial<Slide>) => void;
};

export const PointSlide: React.FC<PointSlideProps> = ({
    slide,
    handleRemove,
    imageOptions,
    changeSlide,
}) => {
    const y = useMotionValue(0);
    const boxShadow = useRaisedShadow(y);
    const { isMobile } = useScreenDetector();

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
                        onClick={() => handleRemove(slide.id)}
                    >
                        <Close width={18} hanging={18} />
                    </button>
                </div>
                <div className="imgbox">
                    <Image
                        src={slide.img || '/logo.png'}
                        width={150}
                        height={80}
                        alt={slide.title || ''}
                    />
                </div>
                <Flex className="list-inputs" vertical>
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
                                fileDownload: currentOption?.fileDownload || '',
                            });
                        }}
                    />
                    <Flex vertical={isMobile} gap={10}>
                        <Input
                            value={slide.title}
                            onChange={(e) => {
                                changeSlide(slide.id, {
                                    title: e.target.value,
                                });
                            }}
                            placeholder="Title"
                        />
                        <InputMoney
                            prefix={'₾'}
                            onChange={(value) => {
                                changeSlide(slide.id, {
                                    price: Number(value),
                                });
                            }}
                            placeholder="Price"
                        />
                    </Flex>
                    <TextArea
                        value={slide.desc}
                        onChange={(e) => {
                            changeSlide(slide.id, {
                                desc: e.target.value,
                            });
                        }}
                        placeholder="Description"
                    />
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
                </Flex>
            </Flex>
        </Reorder.Item>
    );
};
