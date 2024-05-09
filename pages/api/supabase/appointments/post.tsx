import { NextApiRequest, NextApiResponse } from 'next/types';
import { supabase } from '../supabase';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    try {
        const payload = req.body;
        const { data, error } = await supabase
            .from('appointments')
            .update({
                updatedAt: Math.floor(new Date().getTime() / 1000),
                status: payload.status,
            })
            .eq('id', payload.appointmentId);

        if (error) res.status(500).end(error.message);

        res.status(200).json(data);
    } catch (error) {
        res.status(500).end();
    }
}
