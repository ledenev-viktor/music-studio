import { NextApiRequest, NextApiResponse } from 'next/types';
import supabase from '../supabase';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    try {
        const { data, error } = await supabase.from('pictures').select('*');

        if (error) {
            throw new Error(error.message);
        }

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ success: false, error: error });
    }
}
