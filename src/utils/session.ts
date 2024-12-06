import AsyncStorage from '@react-native-async-storage/async-storage';

export const getToken = async () => {
  try {
    const data = await AsyncStorage.getItem('token');
    return data;
  } catch (e) {
    console.error('Failed to get settoken:', e);
  }
};
export const setToken = async (value: string) => {
  try {
    await AsyncStorage.setItem('token', value);
  } catch (e) {
    console.error('Failed to set settoken:', e);
  }
};
export const getId = async () => {
  try {
    const data = await AsyncStorage.getItem('id');
    return data;
  } catch (e) {
    console.error('Failed to get setId:', e);
  }
};
export const setId = async (value: string) => {
  try {
    await AsyncStorage.setItem('id', value);
  } catch (e) {
    console.error('Failed to set setId:', e);
  }
};