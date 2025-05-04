import { useEffect, useState } from 'react';
import { Flex, Input, Tabs, Button, Checkbox, AutoComplete } from 'antd';
import { Reorder } from 'framer-motion';
import Image from 'next/image';
import TextArea from 'antd/es/input/TextArea';
import { Team } from '~types/team';
// eslint-disable-next-line no-restricted-imports
import { useCreateImageOptions } from '../hooks/useCreateImageOptions';
import s from './ListSlidesEdit.module.scss';
import { useListAdmin } from '~features/admin/hooks/useListAdmin';
import { TitleSticky } from '~shared/ui/admin/TitleSticky';
import { CloseButton } from '~shared/ui/admin/CloseButton';
import { AppendButton } from '~shared/ui/admin/AppendButton';
import { useScreenDetector } from '~shared/hooks/responsive';
import { useUpdateTeam } from '~shared/hooks/team/useUpdateTeam';
import { useGetTeam } from '~shared/hooks/team/useGetTeam';
import { isAbsoluteUrl } from '~shared/utils';

export const ListTeamEdit = () => {
    const { data: teamData } = useGetTeam();
    const { mutate: updateTeam } = useUpdateTeam();
    const [lang, setLang] = useState<LanguageKey>('en');

    const imageOptions = useCreateImageOptions();

    const { isMobile } = useScreenDetector();

    const {
        dataElements,
        setDataElements,
        handleAppendElement,
        handleResetElements,
        handleRemoveElement,
        changeElements,
        isChangedElements,
        resetProperty,
    } = useListAdmin<Team['elements']>({
        data: teamData ?? [],
        newElementFields: {
            en: {
                img: '',
                name: '',
                desc: '',
                active: true,
                chief: false,
            },
            ru: {
                img: '',
                name: '',
                desc: '',
                active: true,
                chief: false,
            },
            ka: {
                img: '',
                name: '',
                desc: '',
                active: true,
                chief: false,
            },
        },
    });

    console.log('dataElements', dataElements);

    useEffect(() => {
        if (teamData) {
            setDataElements(teamData);
        }
    }, [teamData, setDataElements]);

    return (
        <Flex vertical className={s.wrapper}>
            <TitleSticky
                title="Our team"
                rightSlot={
                    isChangedElements && (
                        <Flex gap={10}>
                            <Button onClick={handleResetElements}>Reset</Button>
                            <Button
                                onClick={() => {
                                    updateTeam(dataElements);
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
                                            isAbsoluteUrl(
                                                element?.[lang]?.['img'],
                                            )
                                                ? element?.[lang]?.['img']
                                                : '/logo.png'
                                        }
                                        width={150}
                                        height={80}
                                        alt={element?.[lang]?.['name']}
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
                                        value={element?.[lang].name}
                                        onChange={(e) => {
                                            changeElements(element.id, lang, {
                                                name: e.target.value,
                                            });
                                        }}
                                        placeholder="Name"
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
                                <Checkbox
                                    checked={element?.[lang].chief}
                                    onChange={(e) => {
                                        resetProperty({
                                            key: 'chief',
                                            defaultValue: false,
                                            lang,
                                        });
                                        changeElements(element.id, lang, {
                                            chief: e.target.checked,
                                        });
                                    }}
                                >
                                    chief
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
