/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from 'next/types';
import { DriveImages } from 'types/drive';
import { drive } from './index';

const baseUrlDrive = 'https://drive.google.com';

const fetchApi = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { data } = await drive.files.list();

        const images =
            data.files?.filter((file) => file.mimeType?.includes('image')) ||
            ([] as DriveImages);

        const imagePromises = images.map(async (image) => {
            return {
                url: `${baseUrlDrive}/thumbnail?id=${image.id}`,
                urlFileDownload: `${baseUrlDrive}/uc?export=download&id=${image.id}`,
                uid: image.id,
                name: image.name,
            };
        });

        const imageUrls = await Promise.all(imagePromises);
        res.status(200).json(imageUrls);
    } catch (error) {
        res.status(500).json({
            error: 'Failed to retrieve access token' + error,
        });
    }
};

export default fetchApi;
