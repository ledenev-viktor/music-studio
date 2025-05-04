import { useEffect, useState } from 'react';
import { Flex, Input, Tabs, Button, Checkbox, AutoComplete } from 'antd';
import { Reorder } from 'framer-motion';
import Image from 'next/image';
import TextArea from 'antd/es/input/TextArea';
import { Slides } from '~types/slides';
// eslint-disable-next-line no-restricted-imports
import { useCreateImageOptions } from '../hooks/useCreateImageOptions';
import s from './ListSlidesEdit.module.scss';
import { useListAdmin } from '~features/admin/hooks/useListAdmin';
import { TitleSticky } from '~shared/ui/admin/TitleSticky';
import { CloseButton } from '~shared/ui/admin/CloseButton';
import { AppendButton } from '~shared/ui/admin/AppendButton';
import { useUpdateSlides } from '~shared/hooks/slides/useUpdateSlides';
import { useGetSlides } from '~shared/hooks/slides/useGetSlides';
import { useScreenDetector } from '~shared/hooks/responsive';
import { InputMoney } from '~shared/ui';

export const ListSlidesEdit = () => {
    const { data: slidesData } = useGetSlides();
    const { mutate: updateSlides } = useUpdateSlides();
    const [lang, setLang] = useState<LanguageKey>('en');

    const imageOptions = useCreateImageOptions();

    const { isMobile } = useScreenDetector();

    console.log('slidesData', slidesData);

    const {
        dataElements,
        setDataElements,
        handleAppendElement,
        handleResetElements,
        handleRemoveElement,
        changeElements,
        isChangedElements,
    } = useListAdmin<Slides['elements']>({
        data: slidesData ?? [],
        newElementFields: {
            en: {
                img: '',
                title: '',
                desc: '',
                // base64: '',
                price: 0,
                active: true,
            },
            ru: {
                img: '',
                title: '',
                desc: '',
                // base64: '',
                price: 0,
                active: true,
            },
            ka: {
                img: '',
                title: '',
                desc: '',
                // base64: '',
                price: 0,
                active: true,
            },
        },
    });

    console.log('dataElements', dataElements);

    useEffect(() => {
        if (slidesData) {
            setDataElements(slidesData);
        }
    }, [slidesData, setDataElements]);

    return (
        <Flex vertical className={s.wrapper}>
            <TitleSticky
                title="Slider evetns"
                rightSlot={
                    isChangedElements && (
                        <Flex gap={10}>
                            <Button onClick={handleResetElements}>Reset</Button>
                            <Button
                                onClick={() => {
                                    updateSlides(dataElements);
                                }}
                            >
                                Save
                            </Button>
                        </Flex>
                    )
                }
            />
            <div>
                <Tabs
                    type="card"
                    onChange={(key) => {
                        setLang(key as LanguageKey);
                    }}
                    activeKey={lang}
                    items={[
                        { key: 'en', label: 'en' },
                        { key: 'ru', label: 'ru' },
                        { key: 'ka', label: 'ka' },
                    ]}
                />
                <Reorder.Group
                    style={{
                        margin: '0 0 25px',
                        padding: 0,
                        listStyle: 'none',
                        overflow: 'hidden',
                    }}
                    className={s.faqList}
                    axis="y"
                    onReorder={setDataElements}
                    values={dataElements}
                >
                    {dataElements?.map((element) => (
                        <Reorder.Item
                            key={element?.id}
                            value={element}
                            id={element?.id}
                        >
                            <div className={s.faqElement}>
                                <div className={s.closeButtonWrapper}>
                                    <CloseButton
                                        callback={() =>
                                            handleRemoveElement(element.id)
                                        }
                                    />
                                </div>
                                <div className={s.imgbox}>
                                    <Image
                                        src={
                                            element?.[lang]?.['img'] ||
                                            '/logo.png'
                                        }
                                        width={150}
                                        height={80}
                                        alt={element?.[lang]?.['title']}
                                    />
                                </div>
                                <div className={s.fields}></div>

                                <Flex className="list-inputs" vertical>
                                    <AutoComplete
                                        options={imageOptions}
                                        placeholder="The path to the image"
                                        value={element?.[lang]?.img || ''}
                                        onChange={(inputValue) => {
                                            changeElements(element.id, lang, {
                                                img: inputValue,
                                            });
                                        }}
                                    />
                                </Flex>
                                <Flex vertical={isMobile} gap={10}>
                                    <Input
                                        value={element?.[lang].title}
                                        onChange={(e) => {
                                            changeElements(element.id, lang, {
                                                title: e.target.value,
                                            });
                                        }}
                                        placeholder="Title"
                                    />
                                    <InputMoney
                                        prefix={'₾'}
                                        onChange={(value) => {
                                            changeElements(element.id, lang, {
                                                price: Number(value),
                                            });
                                        }}
                                        placeholder="Price"
                                    />
                                </Flex>
                                <TextArea
                                    value={element?.[lang]?.desc}
                                    onChange={(e) => {
                                        changeElements(element.id, lang, {
                                            desc: e.target.value,
                                        });
                                    }}
                                    placeholder="Description"
                                />
                                <Checkbox
                                    checked={element?.[lang].active}
                                    onChange={(e) => {
                                        changeElements(element.id, lang, {
                                            active: e.target.checked,
                                        });
                                    }}
                                >
                                    Active
                                </Checkbox>
                            </div>
                        </Reorder.Item>
                    ))}
                </Reorder.Group>
            </div>
            <AppendButton callback={handleAppendElement} />
        </Flex>
    );
};
