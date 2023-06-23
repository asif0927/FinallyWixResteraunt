import axios from 'axios';
import { API_BASE_URL } from './baseurl';

export const subscribeEmail = async (email) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/subscribe`, { email });

    if (response.status === 200) {
      const data = response.data;
      console.log(data.message); 
    }
  } catch (error) {
    console.error('Failed to subscribe:', error);
  }
};
export const getAllSubscribers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/subscribe`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error('Failed to retrieve subscribers:', error);
    return [];
  }
};