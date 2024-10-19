import { Descriptions, Flex, Typography } from 'antd';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useScreenDetector } from '~hooks/responsive';
import { useGetReviewInfo } from '../useGetReviewInfo';
import { STEP } from '~constants/registrationSteps';
import { StepWrapper } from './StepWrapper';

export const ReviewStep = ({
    onSubmit,
    handleEdit,
}: {
    onSubmit: () => void;
    handleEdit: (value: STEP) => void;
}) => {
    const { t } = useTranslation();
    const { isMobile } = useScreenDetector();
    const { getValues } = useFormContext();
    const fields = getValues();

    const items = useGetReviewInfo(handleEdit, fields);

    return (
        <StepWrapper onGoToNextStep={onSubmit}>
            <Flex justify="center">
                <Typography.Title level={3} style={{ margin: 0 }}>
                    {t('application:reviewStepTitle')}
                </Typography.Title>
            </Flex>
            <Descriptions
                items={items}
                column={1}
                size="middle"
                bordered
                contentStyle={{
                    padding: isMobile ? '12px 12px' : '12px 24px',
                }}
                style={{
                    maxHeight: '90vh',
                    overflow: 'hidden auto',
                }}
            />
        </StepWrapper>
    );
};
