export type FaqFields = { answer: string; question: string; active: boolean };

export type Faq = {
    elements: {
        id: number;
        en: FaqFields;
        ka: FaqFields;
        ru: FaqFields;
    };
    created_at: Intl.DateTimeFormat;
    id: number;
};
