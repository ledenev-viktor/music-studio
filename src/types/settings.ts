export type Settings = {
    settings: {
        id: number;
        img: string;
        title: string;
        desc: string;
        active: boolean;
        base64?: string;
    };
    created_at: Intl.DateTimeFormat;
    id: number;
};

export type Slide = {
    id: number;
    img?: string;
    fileDownload?: string;
    title?: string;
    desc?: string;
    active: boolean;
};
