import axios, {AxiosInstance} from 'axios';
import ApiConfig from './ApiConfig';
import {getToken} from '../utils/session';

export const Client = axios.create({
  baseURL: ApiConfig.BASE_URL,
  timeout: 30000,
  maxRedirects: 0,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const tokenClient = async (): Promise<AxiosInstance> => {
  const token = await getToken();
  console.log(token)
  return axios.create({
    baseURL: ApiConfig.BASE_URL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};
