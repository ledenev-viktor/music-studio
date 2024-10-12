import { useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { useFormContext, useWatch } from 'react-hook-form';
import { FormFields } from '~types/appointments';
import { FormInput } from '~components/ui/hook-form';
import { StepWrapper } from './StepWrapper';
import { InputPhone } from '~components/ui/hook-form/phone';

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

    const [userNameTelegram, userNameInstagram] = useWatch<
        FormFields,
        ['userNameTelegram', 'userNameInstagram']
    >({
        name: ['userNameTelegram', 'userNameInstagram'],
    });

    useEffect(() => {
        userNameInstagram.length > 0 && clearErrors(['userNameTelegram']);
        userNameTelegram.length > 0 && clearErrors(['userNameInstagram']);
    }, [clearErrors, userNameInstagram, userNameTelegram]);

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
            <InputPhone name="phone" label={t('content_form_phone')} />
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
                    validate: (value) => {
                        if (/[а-яА-ЯЁё]/.test(value)) {
                            return t('latin_char_available');
                        }
                        return (
                            value?.length > 0 ||
                            userNameInstagram?.length > 0 ||
                            t('required_filed_optional')
                        );
                    },
                }}
            />
            <FormInput
                name="userNameInstagram"
                label={t('content_form_inst_title')}
                rules={{
                    validate: (value) => {
                        if (/[а-яА-ЯЁё]/.test(value)) {
                            return t('latin_char_available');
                        }
                        return (
                            value?.length > 0 ||
                            userNameTelegram?.length > 0 ||
                            t('required_filed_optional')
                        );
                    },
                }}
            />
        </StepWrapper>
    );
};
