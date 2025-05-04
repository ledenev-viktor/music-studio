import { useEffect, useState } from 'react';
import { Flex, Input, Tabs, Button, Checkbox } from 'antd';
import { Reorder } from 'framer-motion';
import { Faq } from '~types/faq';
import s from './faq.module.scss';
import { useGetFaq } from '~shared/hooks/faq/useGetFaq';
import { useUpdateFaq } from '~shared/hooks/faq/useUpdateFaq';
import { useListAdmin } from '~features/admin/hooks/useListAdmin';
import { TitleSticky } from '~shared/ui/admin/TitleSticky';
import { CloseButton } from '~shared/ui/admin/CloseButton';
import { AppendButton } from '~shared/ui/admin/AppendButton';

export const ListQuestionsEdit = () => {
    const { data: faqData } = useGetFaq();
    const { mutate: updateFaq } = useUpdateFaq();
    const [lang, setLang] = useState<LanguageKey>('en');

    const {
        dataElements,
        setDataElements,
        handleAppendElement,
        handleResetElements,
        handleRemoveElement,
        changeElements,
        isChangedElements,
    } = useListAdmin<Faq['elements']>({
        data: faqData ?? [],
        newElementFields: {
            en: {
                question: '',
                answer: '',
                active: true,
            },
            ru: {
                question: '',
                answer: '',
                active: true,
            },
            ka: {
                question: '',
                answer: '',
                active: true,
            },
        },
    });

    useEffect(() => {
        if (faqData) {
            setDataElements(faqData);
        }
    }, [faqData, setDataElements]);

    return (
        <Flex vertical className={s.wrapper}>
            <TitleSticky
                title="FAQ"
                rightSlot={
                    isChangedElements && (
                        <Flex gap={10}>
                            <Button onClick={handleResetElements}>Reset</Button>
                            <Button
                                onClick={() => {
                                    updateFaq(dataElements);
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
                    {dataElements.map((element) => (
                        <Reorder.Item
                            key={element?.id}
                            value={element}
                            id={element.id}
                        >
                            <div className={s.faqElement}>
                                <div className={s.closeButtonWrapper}>
                                    <CloseButton
                                        callback={() =>
                                            handleRemoveElement(element.id)
                                        }
                                    />
                                </div>
                                <Input
                                    placeholder="Вопрос"
                                    value={element?.[lang]?.['question']}
                                    onChange={(e) => {
                                        changeElements(element.id, lang, {
                                            question: e.target.value,
                                        });
                                    }}
                                />
                                <Input.TextArea
                                    placeholder="Ответ"
                                    value={element?.[lang]?.['answer']}
                                    onChange={(e) => {
                                        changeElements(element.id, lang, {
                                            answer: e.target.value,
                                        });
                                    }}
                                />
                                <Checkbox
                                    checked={element?.[lang]?.['active']}
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
