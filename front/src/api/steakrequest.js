import { API_BASE_URL } from "./baseurl";
import axios from 'axios';


export const getAllSteakes = async (url) => {
  let steakes;
  let URL;
  
  if (!url) {
    URL = API_BASE_URL + '/steaks';
  } else {
    URL = API_BASE_URL + `/steaks/?url=${url}`;
  }
  
  try {
    const response = await axios.get(URL);
    steakes = response.data;
  } catch (error) {
    console.log("Error fetching gallery data:", error);
  }

  return steakes;
};


export const postSteakes = (payload) => {
  return axios.post(`${API_BASE_URL}/steaks`, payload);
};


export const editSteakesByID = (id, payload) => {
  return axios.put(`${API_BASE_URL}/steaks/${id}`, payload);
};

export const deleteSteakes = (id, payload) => {
  return axios.delete(`${API_BASE_URL}/steaks/${id}`, payload);
};
