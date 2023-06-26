import { API_BASE_URL } from "./baseurl";
import axios from 'axios';


export const getAllLogos = async (image) => {
  let logos;
  let URL;
  
  if (!image) {
    URL = API_BASE_URL + '/logo';
  } else {
    URL = API_BASE_URL + `/logo/?image=${image}`;
  }
  
  try {
    const response = await axios.get(URL);
    logos = response.data;
  } catch (error) {
    console.log("Error fetching logos data:", error);
  }

  return logos;
};


export const postLogos = (payload) => {
  return axios.post(`${API_BASE_URL}/logo`, payload);
};


export const editLogosByID = (id, payload) => {
  return axios.put(`${API_BASE_URL}/logo/${id}`, { image: payload.image && payload.image.toString() });
};


export const deleteLogos= (id, payload) => {
  return axios.delete(`${API_BASE_URL}/logo/${id}`, payload);
};
