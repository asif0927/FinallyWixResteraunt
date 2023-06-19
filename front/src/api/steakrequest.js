import axios from "axios";
import { API_BASE_URL } from "./baseurl";

export const getAllSteakes = async (url) => {
  let steakes;
  let URL;
  if (!url) {
    URL = `${API_BASE_URL}/steaks`;
  } else {
    URL = `${API_BASE_URL}/steaks/?url=${url}`;
  }
  await axios.get(URL).then((res) => {
    steakes = res.data;
  });

  return steakes;
}

export const postSteakes = (payload) => {
  axios.post(`${API_BASE_URL}/steaks`, payload);
};

export const editSteakesByID = (id, payload) => {
  axios.put(`${API_BASE_URL}/steaks/${id}`, payload);
}

export const deleteSteakes = (id, payload) => {
  axios.delete(`${API_BASE_URL}/steaks/${id}`, payload);
}
