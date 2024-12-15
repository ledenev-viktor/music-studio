import cn from 'classnames';
import { useGetSettingsBase64 } from '~hooks/settings';
import {
    Logo,
    RegistrationForm,
    CustomMenu,
    SliderEvents,
    OurTeam,
    Faq,
} from '~components/redesign';
import { Layout } from '~entities/Layout';
import s from './home.module.scss';
import { MainBannerWidget } from '~widgets/MainBanner';
import { LaptopLinks } from '~components/redesign';
import { MapWidget } from '~widgets/Map';

const HomePage = () => {
    const { data: slides } = useGetSettingsBase64();

    return (
        <Layout
            header={
                <div className={cn(s.header)}>
                    <div className={s.headerInner}>
                        <Logo />
                        <CustomMenu classNameToggle={s.toggleButton} />
                    </div>
                </div>
            }
            footer={
                <>
                    <div className={s.footer}>
                        <div className={s.footerInner}>
                            <div className={s.footerContacts}>
                                <Logo />
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
            <RegistrationForm />
            <OurTeam />
            <Faq />
        </Layout>
    );
};

export default HomePage;
