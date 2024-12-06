import axios from 'axios';
import ApiConfig from './ApiConfig';
import {getToken} from '../utils/session';
import {Client} from './Client';

export const callLoginApi = async (body: Record<string, any>) => {
  try {
    const response = await Client.post(ApiConfig.LOGIN, body);
    return response?.data;
  } catch (error) {
    throw error;
  }
};

export const callRegisterApi = async (body: Record<string, any>) => {
  try {
    const response = await Client.post(ApiConfig.REGISTER, body);
    return response?.data;
  } catch (error) {
    throw error;
  }
};

export const callLogOutApi = async () => {
  try {
    const token = await getToken();
    const apiClient = axios.create({
      baseURL: ApiConfig.BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const response = await apiClient.post(ApiConfig.LOGOUT);
    return response;
  } catch (error) {
    throw error;
  }
};
