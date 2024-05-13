import { useEffect } from 'react';
import { Flex } from 'antd';
import { useTranslation } from 'next-i18next';
import { useFormContext, useWatch } from 'react-hook-form';
import {
    FormSwitch,
    FormTextarea,
    InterruptButton,
    PrimaryButton,
} from '~components/ui/hook-form';

export const AdditionalStep = ({
    onGoToNextStep,
    onGoToPreviousStep,
    onSaveEdits,
}: {
    onGoToNextStep: () => void;
    onGoToPreviousStep: () => void;
    onSaveEdits?: () => void;
}) => {
    const { t } = useTranslation();
    const { control, resetField } = useFormContext();

    const isCommentNeeded = useWatch({ name: 'isCommentNeeded' });

    useEffect(() => {
        if (isCommentNeeded === false) resetField('isCommentNeeded');
    }, [isCommentNeeded]);

    return (
        <Flex vertical gap={30}>
            <FormSwitch
                name="isCommentNeeded"
                label={t('content_form_comment_title')}
            />
            {isCommentNeeded && (
                <FormTextarea
                    name="comment"
                    control={control}
                    placeholder={t('content_form_additionals_title')}
                />
            )}
            <Flex justify="flex-end" gap={10}>
                {onSaveEdits ? (
                    <PrimaryButton onClick={onSaveEdits} text={t('save')} />
                ) : (
                    <>
                        <InterruptButton
                            text={t('back')}
                            onClick={onGoToPreviousStep}
                        />
                        <PrimaryButton
                            onClick={onGoToNextStep}
                            text={t('continue')}
                        />
                    </>
                )}
            </Flex>
        </Flex>
    );
};
