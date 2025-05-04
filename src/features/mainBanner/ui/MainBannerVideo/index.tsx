import s from './MainBanner.module.scss';

export const MainBannerVideo = ({
    videoSrc,
    title,
    subtitle,
}: {
    videoSrc: string;
    title: string;
    subtitle: string;
}) => {
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
                    <div className={s.infoInner}>
                        <h1>{title}</h1>
                        {subtitle && <h2>{subtitle}</h2>}
                    </div>
                </div>
            </div>
        </div>
    );
};
