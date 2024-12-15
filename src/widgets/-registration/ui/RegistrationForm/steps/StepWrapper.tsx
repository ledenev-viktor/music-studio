import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Flex } from 'antd';
import { useTranslation } from 'react-i18next';
import { InterruptButton, PrimaryButton } from '~components/ui/hook-form';

const transition = { duration: 0.4, ease: [0.43, 0.13, 0.23, 0.96] };

export const StepWrapper = ({
    children,
    onSaveEdits,
    onGoToNextStep,
    onGoToPreviousStep,
    isGoToNextStepDisabled = false,
}: {
    children: ReactNode;
    onSaveEdits?: () => void;
    onGoToPreviousStep?: () => void;
    onGoToNextStep?: () => void;
    isGoToNextStepDisabled?: boolean;
}) => {
    const { t } = useTranslation();

    return (
        <motion.div
            initial="hidden"
            animate="show"
            exit="close"
            variants={{
                hidden: { opacity: 0, x: 20, transition },
                show: { opacity: 1, x: 0, transition },
                close: {
                    opacity: 0,
                    x: -20,
                    transition,
                },
            }}
        >
            <Flex
                vertical
                gap={30}
                style={{
                    minHeight: '200px',
                }}
            >
                {children}
            </Flex>
            {onGoToNextStep && (
                <Flex justify="flex-end" gap={10} style={{ marginTop: 30 }}>
                    {onSaveEdits ? (
                        <PrimaryButton
                            onClick={onSaveEdits}
                            title={t('save')}
                        />
                    ) : (
                        <>
                            {onGoToPreviousStep && (
                                <InterruptButton
                                    title={t('application:backButton')}
                                    onClick={onGoToPreviousStep}
                                />
                            )}
                            <PrimaryButton
                                disabled={isGoToNextStepDisabled}
                                onClick={onGoToNextStep}
                                title={t('application:continueButton')}
                            />
                        </>
                    )}
                </Flex>
            )}
        </motion.div>
    );
};
