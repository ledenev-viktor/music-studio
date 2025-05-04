import { Dayjs } from 'dayjs';

export type FormFields = {
    date: string;
    phone: string;
    userName: string;
    userNameTelegram: string;
    userNameInstagram: string;
    selectedTimeSlots: [];
    isCommentNeeded: boolean;
    additionEquipment: [];
    comment: string;
    weekStartDay?: Dayjs;
};
