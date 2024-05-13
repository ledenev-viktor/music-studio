import { Flex } from 'antd';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import { Button, FormInput } from '~components/ui/hook-form';

export const ContactsScreen = ({
    onGoToNextStep,
    onGoToPreviousStep,
    onSaveEdits,
}: {
    onGoToNextStep: () => void;
    onGoToPreviousStep: () => void;
    onSaveEdits?: () => void;
}) => {
    const { t } = useTranslation();
    const { control } = useFormContext();

    return (
        <Flex vertical gap={30} align="space-between">
            <FormInput
                name="userName"
                label={t('content_form_name_title')}
                control={control}
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
                control={control}
                rules={{
                    required: {
                        value: true,
                        message: t('required_filed'),
                    },
                }}
            />
            <Flex justify="flex-end" gap={10}>
                {onSaveEdits ? (
                    <Button onClick={onSaveEdits}>{t('save')}</Button>
                ) : (
                    <>
                        <Button onClick={onGoToPreviousStep}>
                            {t('back')}
                        </Button>
                        <Button onClick={onGoToNextStep}>
                            {t('continue')}
                        </Button>
                    </>
                )}
            </Flex>
        </Flex>
    );
};
