import cn from 'classnames';
import { useGetSettingsBase64 } from '~hooks/settings';
import {
    Layout,
    MainBanner,
    Logo,
    RegistrationForm,
    CustomMenu,
    SliderEvents,
    OurTeam,
    Faq,
    Map,
    LaptopLinks,
} from '~components/redesign';
import s from './home.module.scss';

const HomePage = () => {
    const { data: slides, isLoading: isLoadingSlides } = useGetSettingsBase64();

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
                    <Map />
                </>
            }
        >
            <MainBanner videoSrc={'/video/drums.mp4'} />
            {!isLoadingSlides && <SliderEvents slides={slides || []} />}
            <RegistrationForm />
            <OurTeam />
            <Faq />
        </Layout>
    );
};

export default HomePage;
