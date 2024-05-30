import styled from '@emotion/styled';
import { Checkbox as CheckboxAntd, Col, Flex, Row } from 'antd';
import { Gutter } from 'antd/es/grid/row';
import {
    Controller,
    UseControllerProps,
    useFormContext,
} from 'react-hook-form';
import { COLORS } from '~variables';
import { ErrorMessage, Label } from '../common';

const Checkbox = styled(CheckboxAntd)`
    &.ant-checkbox {
        &-wrapper {
            &.ant-checkbox-checked .ant-checkbox-inner {
                background: ${COLORS.blue};
                border-color: ${COLORS.blue};
            }
            .ant-checkbox-inner {
                border-color: ${COLORS.blue};
            }
            &:not(.ant-checkbox-wrapper-disabled):hover
                .ant-checkbox-checked:not(.ant-checkbox-disabled)
                .ant-checkbox-inner {
                background-color: ${COLORS.blue};
            }

            .ant-checkbox .ant-checkbox-inner {
                & {
                    width: 26px;
                    height: 26px;
                }
                &:after {
                    width: 8px;
                    height: 13px;
                }
            }

            .ant-checkbox-checked + span {
                color: ${COLORS.blue};
            }
            .ant-checkbox + span {
                font-size: 18px;
                line-height: 1.3;
            }
        }
    }
`;

type CheckboxGroupBaseProps = {
    options: { key: string; label: string; value: string }[];
    gutter?: Gutter | [Gutter, Gutter];
    label?: string;
} & UseControllerProps;

export const CheckboxGroup = ({
    name,
    rules,
    options,
    label,
    gutter = [24, 24],
    ...props
}: CheckboxGroupBaseProps) => {
    const {
        control,
        formState: { errors },
    } = useFormContext();

    const error = errors[name] ? <>{errors[name]?.message}</> : '';

    return (
        <Flex vertical>
            {label && <Label>{label}</Label>}
            <Controller
                name={name}
                control={control}
                rules={rules}
                render={({ field: { value: arrayValue, onChange } }) => (
                    <CheckboxAntd.Group
                        {...props}
                        value={arrayValue.map(
                            (optionValue: { value: string }) =>
                                optionValue.value,
                        )}
                        style={{ width: '100%' }}
                        onChange={(checkedValues) => {
                            const checked = options.filter((option) =>
                                checkedValues.includes(option.value),
                            );
                            console.log(checked);
                            onChange(checked);
                        }}
                    >
                        <Row gutter={gutter}>
                            {options.map((option) => (
                                <Col key={option.key} span={12}>
                                    <Checkbox value={option.value}>
                                        {option.label}
                                    </Checkbox>
                                </Col>
                            ))}
                        </Row>
                    </CheckboxAntd.Group>
                )}
            />
            {error && <ErrorMessage motionId={name}>{error}</ErrorMessage>}
        </Flex>
    );
};
