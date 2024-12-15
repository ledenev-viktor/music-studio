import cn from 'classnames';
import { useGetSettingsBase64 } from '~hooks/settings';
import { SliderEvents, LaptopLinks } from '~components/redesign';
import { RegistrationFormWidget } from '~widgets/RegistrationForm';
import { OurTeamWidget } from '~widgets/OurTeam';
import { MapWidget } from '~widgets/Map';
import { FaqWidget } from '~widgets/Faq';
import { Layout } from '~entities/Layout';
import { Menu } from '~features/menu';
import { MainBannerWidget } from '~widgets/MainBanner';
import { Logo } from '~shared/ui';
import s from './home.module.scss';

const HomePage = () => {
    const { data: slides } = useGetSettingsBase64();

    return (
        <Layout
            header={
                <div className={cn(s.header)}>
                    <div className={s.headerInner}>
                        <Logo />
                        <Menu classNameToggle={s.toggleButton} />
                    </div>
                </div>
            }
            footer={
                <>
                    <div className={s.footer}>
                        <div className={s.footerInner}>
                            <div className={s.footerContacts}>
                                <div className={s.footerSocials}>
                                    <LaptopLinks />
                                </div>
                            </div>
                        </div>
                    </div>
                    <MapWidget />
                </>
            }
        >
            <MainBannerWidget videoSrc={'/video/drums.mp4'} />
            {slides && slides?.length > 0 && (
                <SliderEvents slides={slides || []} />
            )}
            <RegistrationFormWidget />
            <OurTeamWidget />
            <FaqWidget />
        </Layout>
    );
};

export default HomePage;
