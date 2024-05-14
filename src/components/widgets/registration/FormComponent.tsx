import { useState } from 'react';
import { Flex, Steps } from 'antd';
import { useFormContext, FieldValues } from 'react-hook-form';
import styled from '@emotion/styled';
import { useScreenDetector } from '~hooks/responsive';
import { COLORS } from '~variables';
import { BREAKPOINTS } from '~constants/breakpoints';
import {
    TimeSlotsScreen,
    ContactsScreen,
    AdditionalStep,
    FinalScreen,
} from './steps';
import { MODE, STEP, STEP_NUMBER } from '~constants/registrationSteps';

type RegFormBaseProps = {
    className?: string;
};

export const FormComponentBase = ({ className }: RegFormBaseProps) => {
    const {
        handleSubmit,
        getValues,
        trigger,
        formState: { isValid },
        clearErrors,
        reset,
    } = useFormContext();
    const [step, setStep] = useState<STEP>(STEP.TIME_SLOTS_STEP);
    const [mode, setMode] = useState<MODE>(MODE.DEFAULT);

    const { isMobile } = useScreenDetector();

    const onSubmit = async (data: FieldValues) => {
        console.log(data);
        reset();
    };

    const onSaveEdits = () => {
        setMode(MODE.DEFAULT);
        setStep(STEP.REVIEW_STEP);
    };

    const onEdit = (step: STEP) => {
        setMode(MODE.EDIT);
        setStep(step);
    };

    const getStep = () => {
        switch (step) {
            case STEP.TIME_SLOTS_STEP:
                return (
                    <TimeSlotsScreen
                        onSaveEdits={
                            mode === MODE.EDIT ? onSaveEdits : undefined
                        }
                        onGoToNextStep={() => {
                            trigger();

                            if (isValid) {
                                clearErrors(['userName', 'userNameTelegram']);
                                setStep(STEP.CONTACTS_STEP);
                            } else return;
                        }}
                    />
                );
            case STEP.CONTACTS_STEP:
                return (
                    <ContactsScreen
                        onSaveEdits={
                            mode === MODE.EDIT ? onSaveEdits : undefined
                        }
                        onGoToNextStep={() => {
                            trigger();

                            if (isValid) {
                                setStep(STEP.ADDITIONAL_STEP);
                            }
                            return;
                        }}
                        onGoToPreviousStep={() => setStep(STEP.TIME_SLOTS_STEP)}
                    />
                );
            case STEP.ADDITIONAL_STEP:
                return (
                    <AdditionalStep
                        onSaveEdits={
                            mode === MODE.EDIT ? onSaveEdits : undefined
                        }
                        onGoToPreviousStep={() => setStep(STEP.CONTACTS_STEP)}
                        onGoToNextStep={() => setStep(STEP.REVIEW_STEP)}
                    />
                );
            case STEP.REVIEW_STEP:
                return (
                    <FinalScreen
                        onSubmit={() => {
                            onSubmit(getValues());
                            setStep(STEP.TIME_SLOTS_STEP);
                        }}
                        handleEdit={onEdit}
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
            style={{ width: '100%', height: '100vh', background: COLORS.blue }}
        >
            <form
                className={className}
                onSubmit={handleSubmit(onSubmit)}
                style={{
                    maxHeight: '800px',
                    width: '100%',
                    background: COLORS.white,
                }}
            >
                <Flex
                    vertical
                    align="stretch"
                    style={{
                        marginBottom: isMobile ? '10px' : '30px',
                        marginTop: isMobile ? '0' : 0,
                    }}
                >
                    <Steps
                        size={isMobile ? 'small' : 'default'}
                        direction="horizontal"
                        responsive={false}
                        current={mode === MODE.DEFAULT ? STEP_NUMBER[step] : 3}
                        items={new Array(3).fill({})}
                    />
                </Flex>
                {getStep()}
            </form>
        </Flex>
    );
};

export const FormComponent = styled(FormComponentBase)`
    max-width: 600px;
    margin: 0 auto;
    padding: 30px 60px 60px;
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
