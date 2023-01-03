import { MockMethod } from 'vite-plugin-mock';

export default [
    {
        url: '/api/test',
        method: 'get',
        response: ({ query }) => {
            const dataKey = `data|${query.size || 5}`;
            return {
                [dataKey]: [
                    {
                        'id|+1': 1,
                        'name': '@cname',
                        'image': '@image',
                    }
                ]
            }
        }
    }
] as MockMethod[];
