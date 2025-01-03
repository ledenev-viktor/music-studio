import { useGetSettingsBase64 } from '~hooks/settings';
import { SliderEvents } from '~features/events';
import s from './SliderEventsWidget.module.scss';
import { Title } from '~shared/ui';

export const SliderEventsWidget = () => {
    const { data: slides } = useGetSettingsBase64();

    if (!slides) return null;

    return (
        <div className={s.wrapper}>
            <Title>Наши ближайшие события</Title>
            <SliderEvents slides={slides || []} />
        </div>
    );
};
