import bannerimg from 'public/mainbg.png';
import { MainBanner } from '~components/wigets/main-banner';

export default function Page() {
    return (
        <>
            <MainBanner
                src={bannerimg}
                text="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vero, facere voluptatum corrupti error magnam ducimus ut architecto? A, tempore magni! Ducimus autem eligendi nam ad consequuntur quidem quasi soluta voluptates."
                shortText="Lorem ipsum dolor sit, amet consectetur"
            />
        </>
    );
}
