import { Checkbox as CheckboxAntd, Col, Flex, Row } from 'antd';
import { Gutter } from 'antd/es/grid/row';
import {
    Controller,
    UseControllerProps,
    useFormContext,
} from 'react-hook-form';
import { Label } from '../Label';
import s from './CheckboxGroup.module.scss';

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
    const { control } = useFormContext();

    return (
        <Flex vertical className={s.wrapper}>
            {label && <Label style={{ marginBottom: '25px' }}>{label}</Label>}
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
                            onChange(checked);
                        }}
                    >
                        <Row gutter={gutter}>
                            {options.map((option) => (
                                <Col key={option.key} span={12}>
                                    <CheckboxAntd value={option.value}>
                                        {option.label}
                                    </CheckboxAntd>
                                </Col>
                            ))}
                        </Row>
                    </CheckboxAntd.Group>
                )}
            />
        </Flex>
    );
};
