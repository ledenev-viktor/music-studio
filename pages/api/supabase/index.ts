import { NextApiRequest, NextApiResponse } from 'next/types';
import supabase from './supabase';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    switch (req.method) {
        case 'GET':
            try {
                const { data, error } = await supabase
                    .from('appointments')
                    .select('*');

                if (error) {
                    throw new Error(error.message);
                }

                res.status(200).json({ data });
            } catch (error) {
                res.status(500).json({ success: false, error: error });
            }
            break;

        case 'POST':
            try {
                const { data, error } = await supabase
                    .from('appointments')
                    .insert(req.body.data);

                console.log(error);

                if (error) {
                    throw new Error(error.message);
                }

                res.status(200).json({ data });
            } catch (error) {
                res.status(500).json({ success: false, error: error });
            }
            break;
    }
}
