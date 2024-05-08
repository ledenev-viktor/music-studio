import { MIMEType } from 'util';

export type DriveImage = {
    id: string;
    kind: string;
    mimeType: MIMEType;
    name: string;
};

export type Image = {
    uid: string;
    url: string;
    name: string;
    isSelected: boolean;
};

export type Images = Image[];
