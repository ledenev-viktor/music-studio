import { Flex } from 'antd';
import { Title } from '~shared/ui';
import { RegistrationForm } from '~features/regForm';
import s from './RegFormWidget.module.scss';

export const RegFormWidget = () => {
    return (
        <Flex vertical justify="center" className={s.wrapper}>
            <Title>Запишитесь на занятия</Title>
            <RegistrationForm />
        </Flex>
    );
};
