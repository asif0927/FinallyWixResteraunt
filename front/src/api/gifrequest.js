
import { API_BASE_URL } from './baseurl';
import axios from 'axios';

export const getAllGifs = async (giffile) => {
  let gifs;
  let URL;

  if (!giffile) {
    URL = API_BASE_URL + '/gifs';
  } else {
    URL = API_BASE_URL + `/gifs/?giffile=${giffile}`;
  }

  try {
    const response = await axios.get(URL);
    gifs = response.data;
  } catch (error) {
    console.log('Error fetching gifs data:', error);
  }

  return gifs;
};

export const postGifs = (payload) => {
  return axios.post(`${API_BASE_URL}/gifs`, payload);
};

export const editGifByID = (id, payload) => {
  return axios.put(`${API_BASE_URL}/gifs/${id}`, {
    giffile: payload.giffile && payload.giffile.toString(),
  });
};

export const deleteGifs = (id, payload) => {
  return axios.delete(`${API_BASE_URL}/gifs/${id}`, payload);
};
