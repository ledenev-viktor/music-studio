export type SlideWithBase64 = {
    id: number;
    img: string;
    title: string;
    desc: string;
    active: boolean;
    base64?: string;
    price?: number;
};

export type Settings = {
    settings: SlideWithBase64;
    created_at: Intl.DateTimeFormat;
    id: number;
};

export type Slide = {
    id: number;
    img?: string;
    fileDownload?: string;
    title?: string;
    desc?: string;
    price?: number;
    active: boolean;
};
