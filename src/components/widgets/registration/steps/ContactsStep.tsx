import { useTranslation } from 'next-i18next';
import { useFormContext } from 'react-hook-form';
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
    const { clearErrors } = useFormContext();

    return (
        <StepWrapper
            onGoToNextStep={onGoToNextStep}
            onGoToPreviousStep={async () => {
                clearErrors(['userName', 'userNameTelegram']);
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
                    required: {
                        value: true,
                        message: t('required_filed'),
                    },
                }}
            />
        </StepWrapper>
    );
};
