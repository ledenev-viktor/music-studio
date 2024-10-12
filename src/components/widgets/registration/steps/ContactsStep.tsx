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
            <InputPhone
                name="phone"
                label={t('application:phoneNumberTitle')}
            />
            <FormInput
                name="userName"
                label={t('application:nameTitle')}
                rules={{
                    required: {
                        value: true,
                        message: t('application:required'),
                    },
                }}
            />
            <FormInput
                name="userNameTelegram"
                label={t('application:tgTitle')}
                rules={{
                    validate: (value) => {
                        if (/[а-яА-ЯЁё]/.test(value)) {
                            return t('application:incorrectSymbolsError');
                        }
                        return (
                            value?.length > 0 ||
                            userNameInstagram?.length > 0 ||
                            t('application:optionalFieldError')
                        );
                    },
                }}
            />
            <FormInput
                name="userNameInstagram"
                label={t('application:instTitle')}
                rules={{
                    validate: (value) => {
                        if (/[а-яА-ЯЁё]/.test(value)) {
                            return t('application:incorrectSymbolsError');
                        }
                        return (
                            value?.length > 0 ||
                            userNameTelegram?.length > 0 ||
                            t('application:optionalFieldError')
                        );
                    },
                }}
            />
        </StepWrapper>
    );
};
