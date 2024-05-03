import { UseControllerProps } from 'react-hook-form';

type RulesType = UseControllerProps['rules'];

export type HookFormProps = {
    name: string;
    rules?: RulesType;
};
