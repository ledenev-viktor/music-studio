import { drive_v3 } from 'googleapis';

declare global {
    type DriveFiles = drive_v3.Drive['files'];
    type CreateFunctionType = drive_v3.Drive['files']['create'];
    type ListFunctionType = drive_v3.Drive['files']['list'];

    type LanguageKey = 'en' | 'ka' | 'ru';
}
