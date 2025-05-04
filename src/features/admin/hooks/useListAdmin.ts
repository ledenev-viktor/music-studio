import { useEffect, useState } from 'react';
import isEqual from 'lodash/isEqual';

type TElementBase = {
    id: number;
    en: object;
    ka: object;
    ru: object;
};

export const useListAdmin = <T extends TElementBase>({
    data,
    newElementFields,
}: {
    data: T[];
    newElementFields: Omit<T, 'id'>;
}) => {
    const [dataElements, setDataElements] = useState<T[]>(data);

    const handleAppendElement = () => {
        setDataElements((prev) => [
            ...prev,
            { id: prev.length + 1, ...newElementFields } as T,
        ]);
    };

    const handleResetElements = () => {
        if (!dataElements?.length || !data) return;

        setDataElements(data);
    };

    const handleRemoveElement = (id: number) => {
        if (dataElements.length < 1) return;

        setDataElements(
            dataElements?.filter(
                (element: { id: number }) => element.id !== id,
            ),
        );
    };

    const changeElements = (
        id: number,
        lang: LanguageKey,
        objProperty: { [key: string]: unknown },
    ) => {
        setDataElements((prev) =>
            prev.map((element) =>
                element.id === id
                    ? {
                          ...element,
                          [lang]: {
                              ...element[lang],
                              ...objProperty,
                          },
                      }
                    : element,
            ),
        );
    };

    const resetProperty = ({
        key,
        defaultValue,
        lang,
    }: {
        key: string;
        lang: LanguageKey;
        defaultValue?: any;
    }) => {
        const newobj = dataElements.map((item) => {
            const newValue = (item[lang][key] =
                defaultValue ?? (undefined as any));
            return newValue;
        });
        return newobj;
    };

    const [isChangedElements, setIsChangedElements] = useState(false);
    useEffect(() => {
        if (!isEqual(data, dataElements)) setIsChangedElements(true);
        else setIsChangedElements(false);
    }, [dataElements, data]);

    return {
        dataElements,
        setDataElements,
        handleAppendElement,
        handleResetElements,
        handleRemoveElement,
        changeElements,
        resetProperty,
        isChangedElements,
    };
};
