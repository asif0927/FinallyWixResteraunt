import axios from 'axios';
import { API_BASE_URL } from './baseurl';


export const getCategories = () => {
  return axios.get(`${API_BASE_URL}/categories`);
};

export const addCategory = (categoryData) => {
  return axios.post(`${API_BASE_URL}/categories`, categoryData);
};

export const updateCategory = (categoryId, categoryData) => {
  return axios.put(`${API_BASE_URL}/categories/${categoryId}`, categoryData);
};

export const deleteCategory = (categoryId) => {
  return axios.delete(`${API_BASE_URL}/categories/${categoryId}`);
};
