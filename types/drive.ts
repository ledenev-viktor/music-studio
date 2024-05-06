import { MIMEType } from 'util';

export type DriveImages = Array<{
    kind: string | null | undefined;
    mimeType: MIMEType;
    id: string;
    name: string;
}>;
