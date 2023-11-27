import { Configuration } from '../types/axios';

const basePath = process.env.NEXT_PUBLIC_API_URL
export const config = new Configuration({ basePath });
