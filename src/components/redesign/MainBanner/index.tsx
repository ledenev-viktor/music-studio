import s from './MainBanner.module.scss';

export const MainBanner = ({ videoSrc }: { videoSrc: string }) => {
    return (
        <div className={s.bannerWrapper}>
            <div className={s.bannerInner}>
                {videoSrc && (
                    <video
                        className={s.bannerVideo}
                        loop
                        muted
                        autoPlay
                        playsInline
                    >
                        <source src={videoSrc} type="video/mp4" />
                    </video>
                )}
                <div className={s.info}>
                    <h1>Мы студия Практика!</h1>
                    <h2>У нас ты прокачаешь свои навыки!</h2>
                </div>
            </div>
        </div>
    );
};
