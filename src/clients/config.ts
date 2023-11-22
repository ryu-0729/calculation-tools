import { AxiosRequestConfig } from 'axios';
import { Configuration } from '../types/axios';

// TODO: .envに記載
const basePath = "http://127.0.0.1:8000"
export const config = new Configuration({ basePath });
