import { NextApiRequest, NextApiResponse } from 'next/types';
import { supabase } from '../supabase';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    try {
        const { data, error } = await supabase.from('appointments').select('*');

        if (error) {
            res.status(500).end(error.message);
        }

        if (!data?.length && !error) {
            res.status(500).end('Problems with authorization');
        }

        res.status(200).json(data);
    } catch (error) {
        res.status(500).end(error);
    }
}
