/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from 'next/types';
import { DriveImages } from 'types/drive';
import { drive } from './index';

const fetchApi = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { data } = await drive.files.list();

        const images =
            data.files?.filter((file) => file.mimeType?.includes('image')) ||
            ([] as DriveImages);

        const imagePromises = images.map(async (image) => {
            const { data: fileData } = await drive.files.get(
                {
                    fileId: image.id!,
                    alt: 'media',
                },
                { responseType: 'arraybuffer' },
            );

            const buffer = Buffer.from(fileData as Buffer);
            const base64 = buffer.toString('base64');
            const mimeType = image.mimeType || 'image/jpeg';

            return {
                url: `https://drive.google.com/thumbnail?id=${image.id}`,
                base64: `data:${mimeType};base64,${base64}`,
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
