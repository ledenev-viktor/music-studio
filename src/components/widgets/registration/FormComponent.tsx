import { useEffect, useState } from 'react';
import { Flex, Steps } from 'antd';
import { useFormContext } from 'react-hook-form';
import styled from '@emotion/styled';
import { AnimatePresence } from 'framer-motion';
import Fireworks from 'react-canvas-confetti/dist/presets/fireworks';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import { useScreenDetector } from '~hooks/responsive';
import { COLORS } from '~variables';
import { useCreateAppointments } from '~hooks/appointments';
import { FormFields } from '~types/appointments';
import { BREAKPOINTS } from '~constants/breakpoints';
import {
    ContactsStep,
    AdditionalsStep,
    ReviewStep,
    DateTimeStep,
    StatusScreen,
} from './steps';
import { MODE, STEP, STEP_NUMBER } from '~constants/registrationSteps';

type RegFormBaseProps = {
    className?: string;
};

export const FormComponentBase = ({ className }: RegFormBaseProps) => {
    const { t } = useTranslation();
    const { locale } = useRouter();

    const {
        handleSubmit,
        getValues,
        reset,
        trigger,
        formState: { errors },
    } = useFormContext<FormFields>();

    useEffect(() => {
        const currentErrors = Object.keys(errors) as Array<keyof FormFields>;

        if (currentErrors.length > 0) {
            Promise.resolve().then(() => {
                trigger(currentErrors);
            });
        }
    }, [locale, errors, trigger]);

    const [step, setStep] = useState<STEP>(STEP.DATE_TIME_STEP);
    const [mode, setMode] = useState<MODE>(MODE.DEFAULT);
    const [showFirework, setShowFirework] = useState(false);
    const { isMobile } = useScreenDetector();

    const { mutate: sendData } = useCreateAppointments();

    const onSubmit = async (data: FormFields) => {
        sendData(data, {
            onSuccess: () => {
                setShowFirework(true);
                setStep(STEP.SUCCESS);
                reset();
            },
            onError: () => {
                setStep(STEP.FAIL);
            },
        });
    };

    const onSaveEdits = async () => {
        const valid = await trigger();

        if (valid) {
            setMode(MODE.DEFAULT);
            setStep(STEP.REVIEW_STEP);
        }
    };

    const onEdit = (step: STEP) => {
        setMode(MODE.EDIT);
        setStep(step);
    };

    const validateAndProceed = async (
        fields: Array<keyof FormFields>,
        nextStep: STEP,
    ) => {
        const valid = await trigger(fields);
        if (valid) {
            setStep(nextStep);
        }
    };

    const getStep = () => {
        switch (step) {
            case STEP.DATE_TIME_STEP:
                return (
                    <DateTimeStep
                        onSaveEdits={
                            mode === MODE.EDIT ? onSaveEdits : undefined
                        }
                        onGoToNextStep={() =>
                            validateAndProceed(
                                ['date', 'selectedTimeSlots'],
                                STEP.CONTACTS_STEP,
                            )
                        }
                    />
                );
            case STEP.CONTACTS_STEP:
                return (
                    <ContactsStep
                        onSaveEdits={
                            mode === MODE.EDIT ? onSaveEdits : undefined
                        }
                        onGoToNextStep={() =>
                            validateAndProceed(
                                [
                                    'phone',
                                    'userName',
                                    'userNameTelegram',
                                    'userNameInstagram',
                                ],
                                STEP.ADDITIONAL_STEP,
                            )
                        }
                        onGoToPreviousStep={() => setStep(STEP.DATE_TIME_STEP)}
                    />
                );
            case STEP.ADDITIONAL_STEP:
                return (
                    <AdditionalsStep
                        onSaveEdits={
                            mode === MODE.EDIT ? onSaveEdits : undefined
                        }
                        onGoToPreviousStep={() => setStep(STEP.CONTACTS_STEP)}
                        onGoToNextStep={() => setStep(STEP.REVIEW_STEP)}
                    />
                );
            case STEP.REVIEW_STEP:
                return (
                    <ReviewStep
                        onSubmit={() => {
                            onSubmit(getValues());
                        }}
                        handleEdit={onEdit}
                    />
                );
            case STEP.SUCCESS:
                return (
                    <StatusScreen
                        onComplete={() => {
                            setShowFirework(false);
                            setStep(STEP.DATE_TIME_STEP);
                        }}
                        imgProps={{ alt: 'success', path: '/success.svg' }}
                        title={t('application:successStepTitle')}
                        description={t('application:successStepDescription')}
                    />
                );
            case STEP.FAIL:
                return (
                    <StatusScreen
                        onComplete={() => {
                            setStep(STEP.REVIEW_STEP);
                        }}
                        imgProps={{ alt: 'fail', path: '/fail.png' }}
                        title={t('application:failScreenTitle')}
                        description={t('application:failScreenDescription')}
                    />
                );
            default:
                return null;
        }
    };

    const isNotResultStep = step !== STEP.SUCCESS && step !== STEP.FAIL;

    return (
        <Flex
            vertical
            justify="center"
            style={{
                width: '100%',
                height: '100vh',
                background: COLORS.blue,
                overflow: 'hidden',
            }}
        >
            <form
                className={className}
                onSubmit={handleSubmit(onSubmit)}
                style={{
                    width: '100%',
                    background: COLORS.white,
                    minWidth: '320px',
                }}
            >
                {isNotResultStep && (
                    <Flex
                        vertical
                        align="stretch"
                        style={{
                            marginBottom: isMobile ? '10px' : '30px',
                            marginTop: 0,
                        }}
                    >
                        <Steps
                            size={isMobile ? 'small' : 'default'}
                            direction="horizontal"
                            responsive={false}
                            current={
                                mode === MODE.DEFAULT ? STEP_NUMBER[step] : 3
                            }
                            items={new Array(3).fill({})}
                        />
                    </Flex>
                )}
                <AnimatePresence mode="wait" initial={false}>
                    {getStep()}
                </AnimatePresence>
            </form>
            {showFirework && (
                <Fireworks autorun={{ speed: 3, duration: 3000 }} />
            )}
        </Flex>
    );
};

export const FormComponent = styled(FormComponentBase)`
    max-width: 600px;
    margin: 0 auto;
    padding: 50px 60px 60px;
    box-sizing: border-box;
    box-shadow: 0px 0px 20px -14px rgba(0, 0, 0, 1);
    border-radius: 15px;

    @media screen and (max-width: ${BREAKPOINTS.mobile}) {
        padding: 20px;
    }

    .group-field {
        margin: 0 -10px;
        flex-wrap: nowrap;
        &-item {
            width: calc(50% - 20px);
            margin: 0 10px;
        }

        @media screen and (max-width: ${BREAKPOINTS.mobile}) {
            margin: 0;
            flex-wrap: wrap;
            &-item {
                width: 100%;
                margin: 0;
            }
        }
    }
`;
