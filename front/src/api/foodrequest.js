import axios from 'axios';
import { API_BASE_URL } from './baseurl';

export const getFoods = () => {
  return axios.get(`${API_BASE_URL}/foods`);
};


export const addFood = (foodData) => {
  return axios.post(`${API_BASE_URL}/foods`, foodData);
};

export const updateFood = (foodId, foodData) => {
  return axios.put(`${API_BASE_URL}/foods/${foodId}`, foodData);
};

export const deleteFood = (foodId) => {
  return axios.delete(`${API_BASE_URL}/foods/${foodId}`);
};
