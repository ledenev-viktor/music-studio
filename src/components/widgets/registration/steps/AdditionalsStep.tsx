import { useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { useFormContext, useWatch } from 'react-hook-form';
import { FormSwitch, FormTextarea } from '~components/ui/hook-form';
import { StepWrapper } from './StepWrapper';

export const AdditionalsStep = ({
    onGoToNextStep,
    onGoToPreviousStep,
    onSaveEdits,
}: {
    onGoToNextStep: () => void;
    onGoToPreviousStep: () => void;
    onSaveEdits?: () => void;
}) => {
    const { t } = useTranslation();
    const { resetField } = useFormContext();

    const isCommentNeeded = useWatch({ name: 'isCommentNeeded' });

    useEffect(() => {
        if (isCommentNeeded === false) resetField('isCommentNeeded');
    }, [isCommentNeeded]);

    return (
        <StepWrapper
            onGoToNextStep={onGoToNextStep}
            onGoToPreviousStep={onGoToPreviousStep}
            onSaveEdits={onSaveEdits}
        >
            <FormSwitch
                name="isCommentNeeded"
                label={t('content_form_comment_title')}
            />
            {isCommentNeeded && (
                <FormTextarea
                    name="comment"
                    placeholder={t('content_form_additionals_title')}
                />
            )}
        </StepWrapper>
    );
};
