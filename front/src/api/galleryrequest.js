import { API_BASE_URL } from "./baseurl";
import axios from 'axios';


export const getAllGallerys = async (img) => {
  let Gallerys;
  let URL;
  
  if (!img) {
    URL = API_BASE_URL + '/gallery';
  } else {
    URL = API_BASE_URL + `/gallery/?img=${img}`;
  }
  
  try {
    const response = await axios.get(URL);
    Gallerys = response.data;
  } catch (error) {
    console.log("Error fetching gallery data:", error);
  }

  return Gallerys;
};


export const postGalerrys = (payload) => {
  return axios.post(`${API_BASE_URL}/gallery`, payload);
};


export const editGalleryByID = (id, payload) => {
  return axios.put(`${API_BASE_URL}/gallery/${id}`, payload);
};

export const deleteGallery = (id, payload) => {
  return axios.delete(`${API_BASE_URL}/gallery/${id}`, payload);
};