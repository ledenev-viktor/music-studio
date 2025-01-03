import { SliderEventsWidget } from '~widgets/SliderEvents';
import { SocialLinksWidget } from '~widgets/socials';
import { RegFormWidget } from '~widgets/RegistrationForm';
import { TeamWidget } from '~widgets/team';
import { FaqWidget } from '~widgets/Faq';
import { Layout } from '~entities/Layout';
import { Menu } from '~features/menu';
import { MainBannerWidget } from '~widgets/MainBanner';
import { Logo } from '~shared/ui';
import s from './home.module.scss';
import { Map } from '~features/map';

const HomePage = () => {
    return (
        <Layout
            header={
                <>
                    <Logo />
                    <Menu classNameToggle={s.toggleButton} />
                </>
            }
            footer={
                <>
                    <SocialLinksWidget />
                    <Map />
                </>
            }
        >
            <MainBannerWidget />
            <SliderEventsWidget />
            <RegFormWidget />
            <TeamWidget />
            <FaqWidget />
        </Layout>
    );
};

export default HomePage;
