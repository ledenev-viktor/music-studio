import { MainBannerVideo } from '~features/mainBanner';

export const MainBannerWidget = () => {
    return (
        <MainBannerVideo
            videoSrc="/video/drums.mp4"
            title="Мы студия Практика!"
            subtitle="У нас ты прокачаешь свои навыки!"
        />
    );
};
