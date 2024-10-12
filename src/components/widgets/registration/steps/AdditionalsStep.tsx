import { useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { useFormContext, useWatch } from 'react-hook-form';
import { FormSwitch, FormTextarea } from '~components/ui/hook-form';
import { StepWrapper } from './StepWrapper';
import { CheckboxGroup } from '~components/ui/hook-form/checkbox-group';

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
    }, [isCommentNeeded, resetField]);

    const additionEquipment = [
        {
            key: '1',
            value: 'value1',
            label: t('application:additionEquipmentOption1'),
        },
        {
            key: '2',
            value: 'value2',
            label: t('application:additionEquipmentOption2'),
        },
        {
            key: '3',
            value: 'value3',
            label: t('application:additionEquipmentOption3'),
        },
        {
            key: '4',
            value: 'value4',
            label: t('application:additionEquipmentOption4'),
        },
    ];

    return (
        <StepWrapper
            onGoToNextStep={onGoToNextStep}
            onGoToPreviousStep={onGoToPreviousStep}
            onSaveEdits={onSaveEdits}
        >
            <CheckboxGroup
                name="additionEquipment"
                label={t('application:additionStepTitle')}
                options={additionEquipment}
            />
            <FormSwitch
                name="isCommentNeeded"
                label={t('application:commentTitle')}
            />
            {isCommentNeeded && (
                <FormTextarea
                    name="comment"
                    placeholder={t('application:commentPlaceholder')}
                />
            )}
        </StepWrapper>
    );
};
