import AsyncStorage from '@react-native-async-storage/async-storage';

export const setData = async (key: string, value: any) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error saving data', error);
  }
};

export const getData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (!value) {
      return null; 
    }
    return JSON.parse(value); 
  } catch (error) {
    console.error("Error retrieving data", error);
    return null;
  }
};