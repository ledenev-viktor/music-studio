export interface SlideFields {
    img: string;
    title: string;
    desc: string;
    active: boolean;
    base64?: string;
    price?: number;
}

export type Slides = {
    elements: {
        id: number;
        en: SlideFields;
        ka: SlideFields;
        ru: SlideFields;
    };
    created_at: Intl.DateTimeFormat;
    id: number;
};
