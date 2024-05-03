import * as yup from 'yup';

export const createValidObject = (fields: string[] = []) => {
    const obj: Record<string, yup.Schema> = {};

    fields.forEach((field) => {
        if (field === 'UserName' || field === 'UserNameTelegram') {
            obj[field] = yup.string().required('This field is required');
        }
    });

    return obj;
};
