import { NextApiRequest, NextApiResponse } from 'next/types';
import { api } from '~utils/api.helper';

const fetchApi = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { data } = await api.get('https://dummyjson.com/products/1');

        return res.json(data);
    } catch (error: any) {
        return res.status(error.response?.status || 500).end(error.message);
    }
};

export default fetchApi;
