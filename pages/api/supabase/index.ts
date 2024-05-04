import { NextApiRequest, NextApiResponse } from 'next/types';
import supabase from './supabase';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const { user } = req.body;
    console.log(user);

    try {
        const { data, error } = await supabase.from('appointments').select('*');

        if (error) {
            throw new Error(error.message);
        }

        res.status(200).json({ data });
    } catch (error) {
        res.status(500).json({ success: false, error: error });
    }
}
