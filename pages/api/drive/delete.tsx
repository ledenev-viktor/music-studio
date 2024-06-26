/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from 'next/types';
import { drive } from './index';

const fetchApi = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const fileId = req.body.fileId;

        await drive.files.delete({
            fileId,
        });

        res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json({
            error: 'Failed to retrieve access token' + error,
        });
    }
};

export default fetchApi;
