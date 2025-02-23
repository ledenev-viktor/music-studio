import { useEffect, useRef } from 'react';
import { Flex, Typography } from 'antd';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import s from './faq.module.scss';
import { FormInput, FormTextarea } from '~shared/ui';
import { useGetFaq } from '~shared/hooks/faq/useGetFaq';
import { useUpdateFaq } from '~shared/hooks/faq/useUpdateFaq';

export const ListQuestionsEdit = () => {
    const { mutate: updateFaq } = useUpdateFaq();
    const { data: faqData } = useGetFaq();

    const form = useForm();

    const isDataApplied = useRef(false);

    useEffect(() => {
        if (faqData && !isDataApplied.current) {
            form.reset({ groups: faqData });
            isDataApplied.current = true;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [faqData, form.reset]);

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: 'groups',
    });

    const onSubmit = (data) => {
        const prepareData = createDataFaq(data?.groups);
        updateFaq(prepareData);
        console.log(data);
    };

    return (
        <Flex vertical className={s.wrapper}>
            <Typography.Title>FAQ</Typography.Title>
            <div>
                <FormProvider {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <Flex vertical gap={25} className={s.questionsList}>
                            {fields.map((group, groupIndex) => (
                                <div key={group.id}>
                                    <div>
                                        <FormInput
                                            name={`groups.${groupIndex}.question`}
                                        />
                                        <FormTextarea
                                            name={`groups.${groupIndex}.answer`}
                                        />
                                        <FormInput
                                            name={`groups.${groupIndex}.id`}
                                            type="hidden"
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            remove(groupIndex);
                                        }}
                                    >
                                        Удалить вопрос
                                    </button>
                                </div>
                            ))}
                        </Flex>
                        <div className={s.buttonsWrapper}>
                            <button
                                type="button"
                                onClick={() =>
                                    append({
                                        id: null,
                                        question: '',
                                        answer: '',
                                    })
                                }
                            >
                                Добавить вопрос
                            </button>
                            <button type="submit">Сохранить</button>
                        </div>
                    </form>
                </FormProvider>
            </div>
        </Flex>
    );
};

const createDataFaq = (data) =>
    data.map((item, index) => {
        return {
            id: index + 1,
            question: item.question,
            answer: item.answer,
        };
    });
