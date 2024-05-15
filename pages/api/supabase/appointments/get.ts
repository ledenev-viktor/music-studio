import { NextApiRequest, NextApiResponse } from 'next/types';
import { supabase } from '../supabase';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    try {
        const { data, error } = await supabase
            .from('appointments')
            .select('*')
            .gte('startTime', new Date().toISOString());

        if (error) {
            res.status(500).json(error);
        }

        if (!data?.length && !error) {
            res.status(500).json({ error: 'Problems with authorization' });
        }

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json(error);
    }
}
