import { SocialLinks } from '~features/socials';
import s from './SocialLinksWidget.module.scss';

export const SocialLinksWidget = () => {
    return (
        <div className={s.wrapper}>
            <SocialLinks />
        </div>
    );
};
