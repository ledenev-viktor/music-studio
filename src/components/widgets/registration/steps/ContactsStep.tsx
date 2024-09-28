import { useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { useFormContext, useWatch } from 'react-hook-form';
import { PhoneNumberUtil } from 'google-libphonenumber';
import { FormFields } from '~types/appointments';
import { FormInput } from '~components/ui/hook-form';
import { StepWrapper } from './StepWrapper';
import { InputPhone } from '~components/ui/hook-form/input-phone';

const phoneUtil = PhoneNumberUtil.getInstance();

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
                    'phone',
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
                listCountries={['ge', 'us', 'ru']}
                label={t('content_form_phone')}
                rules={{
                    validate: (value: string) => {
                        const message = t('required_filed_phone');
                        try {
                            return (
                                (value?.length > 0 &&
                                    phoneUtil.isValidNumber(
                                        phoneUtil.parseAndKeepRawInput(value),
                                    )) ||
                                message
                            );
                        } catch (error) {
                            return message;
                        }
                    },
                }}
            />
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
                        userNameInstagram?.length > 0 ||
                        t('required_filed_optional'),
                }}
            />
            <FormInput
                name="userNameInstagram"
                label={t('content_form_inst_title')}
                rules={{
                    validate: (value) =>
                        value?.length > 0 ||
                        userNameTelegram?.length > 0 ||
                        t('required_filed_optional'),
                }}
            />
        </StepWrapper>
    );
};
