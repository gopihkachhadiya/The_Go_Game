import ApiConfig from './ApiConfig';
import {tokenClient} from './Client';

export const getListAPI = async () => {
  try {
    const apiClient = await tokenClient();
    const response = await apiClient.get(ApiConfig.GET_LIST);
    return response?.data;
  } catch (err) {
    throw err;
  }
};

export const AddListAPI = async (data: any) => {
  try {
    const apiClient = await tokenClient();
    const response = await apiClient.post(ApiConfig.ADD_LIST, data);
    return response?.data;
  } catch (err) {
    throw err;
  }
};

export const DeleteListAPI = async (id: any) => {
  try {
    const apiClient = await tokenClient();
    const response = await apiClient.delete(ApiConfig.DELETE_LIST + id);
    return response?.data;
  } catch (err) {
    throw err;
  }
};

export const UpdateListAPI = async (id: string, data: any) => {
  try {
    const apiClient = await tokenClient();
    const response = await apiClient.put(ApiConfig.UPDATE_LIST + id, data);
    return response?.data;
  } catch (err) {
    throw err;
  }
};
