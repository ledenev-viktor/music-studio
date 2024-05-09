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

        const mappedUrl = images?.map((image) => ({
            url: `https://drive.google.com/thumbnail?id=${image.id}`,
            uid: image.id,
            name: image.name,
        }));

        res.status(200).json(mappedUrl);
    } catch (error) {
        res.status(500).end({
            error: 'Failed to retrieve access token' + error,
        });
    }
};

export default fetchApi;
