import { useEffect, useState } from 'react';
import isEqual from 'lodash/isEqual';
import { useUpdateSettings } from '~hooks/settings';
import { Slide } from '~types/settings';

export const useControlSlides = (slidesData: Slide[]) => {
    const { mutate: updateSettings } = useUpdateSettings();
    const [slides, setSlides] = useState<Slide[]>([]);

    useEffect(() => {
        if (!slidesData?.length) return;

        return setSlides(slidesData);
    }, [slidesData]);

    const handleAddSlide = () => {
        setSlides((prev: Slide[]) => [
            ...prev,
            {
                id: prev.length + 1,
                img: '',
                fileDownload: '',
                title: '',
                desc: '',
                active: false,
            },
        ]);
    };

    const handleSaveSlides = () => {
        updateSettings(slides);
    };

    const handleResetSlides = () => {
        if (!slidesData?.length) return;

        setSlides(slidesData);
    };

    const handleRemove = (id: number) => {
        if (slides.length < 1) return;
        setSlides(slides?.filter((slide: { id: number }) => slide.id !== id));
    };

    const changeSlide = (id: number, objProperty: Partial<Slide>) => {
        setSlides((prev: Slide[]) =>
            prev.map((el) =>
                el.id === id
                    ? {
                          ...el,
                          ...objProperty,
                      }
                    : el,
            ),
        );
    };

    const [isChangedSlides, setIsChangedSlides] = useState(false);
    useEffect(() => {
        if (!isEqual(slidesData, slides)) setIsChangedSlides(true);
        else setIsChangedSlides(false);
    }, [slides, slidesData]);

    return {
        slides,
        handleAddSlide,
        handleSaveSlides,
        handleResetSlides,
        handleRemove,
        changeSlide,
        isChangedSlides,
        setSlides,
    };
};
