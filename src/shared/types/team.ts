export interface TeamFields {
    chief: boolean | undefined;
    img: string;
    name: string;
    desc: string;
    active: boolean;
}

export type Team = {
    elements: {
        id: number;
        en: TeamFields;
        ka: TeamFields;
        ru: TeamFields;
    };
    created_at: Intl.DateTimeFormat;
    id: number;
};
