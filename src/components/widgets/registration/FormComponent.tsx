import { useState } from 'react';
import { Flex, Steps } from 'antd';
import { FieldValues, useFormContext } from 'react-hook-form';
import styled from '@emotion/styled';
import { AnimatePresence } from 'framer-motion';
import Fireworks from 'react-canvas-confetti/dist/presets/fireworks';
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
    SuccessScreen,
} from './steps';
import { MODE, STEP, STEP_NUMBER } from '~constants/registrationSteps';

type RegFormBaseProps = {
    className?: string;
};

export const FormComponentBase = ({ className }: RegFormBaseProps) => {
    const { handleSubmit, getValues, reset, trigger } = useFormContext();

    const [step, setStep] = useState<STEP>(STEP.DATE_TIME_STEP);
    const [mode, setMode] = useState<MODE>(MODE.DEFAULT);
    const [showFirework, setShowFirework] = useState(false);
    const { isMobile } = useScreenDetector();

    const { mutate: sendFormData } = useCreateAppointments();
    const onSubmit = async (data: FieldValues) => {
        const formData: FormFields = data as FormFields;
        sendFormData(formData, {
            onSuccess: () => {
                reset();
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

    const validateAndProceed = async (fields: string[], nextStep: STEP) => {
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
                                ['userName', 'userNameTelegram'],
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
                            setShowFirework(true);
                            onSubmit(getValues());
                            setStep(STEP.SUCCESS);
                        }}
                        handleEdit={onEdit}
                    />
                );
            case STEP.SUCCESS:
                return (
                    <SuccessScreen
                        onComplete={() => {
                            setShowFirework(false);
                            setStep(STEP.DATE_TIME_STEP);
                        }}
                    />
                );
            default:
                return null;
        }
    };

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
                    maxHeight: '650px',
                    width: '100%',
                    background: COLORS.white,
                    minWidth: '320px',
                }}
            >
                {step !== STEP.SUCCESS && (
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
