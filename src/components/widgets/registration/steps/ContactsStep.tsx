import { useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { useFormContext, useWatch } from 'react-hook-form';
import { FormInput } from '~components/ui/hook-form';
import { StepWrapper } from './StepWrapper';

export const ContactsStep = ({
    onGoToNextStep,
    onGoToPreviousStep,
    onSaveEdits,
}: {
    onGoToNextStep: () => void;
    onGoToPreviousStep: () => void;
    onSaveEdits?: () => void;
}) => {
    const { t } = useTranslation();
    const { clearErrors, control } = useFormContext();

    const fieldUserNameTelegram = useWatch({
        control,
        name: 'userNameTelegram',
    });
    const fieldUserNameInstagram = useWatch({
        control,
        name: 'userNameInstagram',
    });

    useEffect(() => {
        fieldUserNameInstagram.length > 0 && clearErrors(['userNameTelegram']);
        fieldUserNameTelegram.length > 0 && clearErrors(['userNameInstagram']);
    }, [clearErrors, fieldUserNameInstagram, fieldUserNameTelegram]);

    return (
        <StepWrapper
            onGoToNextStep={onGoToNextStep}
            onGoToPreviousStep={async () => {
                clearErrors([
                    'userName',
                    'userNameTelegram',
                    'userNameInstagram',
                ]);
                onGoToPreviousStep();
            }}
            onSaveEdits={onSaveEdits}
        >
            <FormInput
                name="userName"
                label={t('content_form_name_title')}
                rules={{
                    required: {
                        value: true,
                        message: t('required_filed'),
                    },
                }}
            />
            <FormInput
                name="userNameTelegram"
                label={t('content_form_tg_title')}
                rules={{
                    validate: (value) =>
                        value?.length > 0 ||
                        fieldUserNameInstagram?.length > 0 ||
                        t('required_filed_optional'),
                }}
            />
            <FormInput
                name="userNameInstagram"
                label={t('content_form_inst_title')}
                rules={{
                    validate: (value) =>
                        value?.length > 0 ||
                        fieldUserNameTelegram?.length > 0 ||
                        t('required_filed_optional'),
                }}
            />
        </StepWrapper>
    );
};
