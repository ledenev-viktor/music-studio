import cn from 'classnames';
import s from './style.module.scss';

export const OurTeam = () => {
    return (
        <div className={s.wrapper}>
            <div>
                <h2 className={s.title}>Наша команда</h2>
            </div>
            <div className={s.teamWrapper}>
                <div className={cn(s.person, s.chief)}>
                    <div className={s.imgbox}>
                        <img className={s.img} src="/bos.webp" alt="" />
                    </div>
                    <div>
                        <div className={s.personName}>Олег Олегов</div>
                        <p className={s.personPosition}>Большой бос</p>
                        <div className={s.personQuote}>
                            {/* <img src="/qouteIcon.svg" alt="" /> */}
                            <span>В Риме был, а папы не видал.</span>
                        </div>
                    </div>
                </div>
                <div className={cn(s.person)}>
                    <div className={s.imgbox}>
                        <img className={s.img} src="/person.jpg" alt="" />
                    </div>
                    <div>
                        <div className={s.personName}>Олег Артемов</div>
                        <p className={s.personPosition}>Маленький бос</p>
                    </div>
                </div>
                <div className={cn(s.person)}>
                    <div className={s.imgbox}>
                        <img className={s.img} src="/person.jpg" alt="" />
                    </div>
                    <div>
                        <div className={s.personName}>Олег Васин</div>
                        <p className={s.personPosition}>Первый заместитель</p>
                    </div>
                </div>
                <div className={cn(s.person)}>
                    <div className={s.imgbox}>
                        <img className={s.img} src="/person.jpg" alt="" />
                    </div>
                    <div>
                        <div className={s.personName}>Олег Константинов</div>
                        <p className={s.personPosition}>Бухгалтер</p>
                    </div>
                </div>
                <div className={cn(s.person)}>
                    <div className={s.imgbox}>
                        <img className={s.img} src="/person.jpg" alt="" />
                    </div>
                    <div>
                        <div className={s.personName}>Олег Иванин</div>
                        <p className={s.personPosition}>Секретарь</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
