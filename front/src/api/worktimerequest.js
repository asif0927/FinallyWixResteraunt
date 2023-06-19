import axios from "axios";
import { API_BASE_URL } from "./baseurl";

export const getAllWorkTimes = async (starttime) => {
  let worktime;
  let URL;
  if (!starttime) {
    URL = `${API_BASE_URL}/worktime`;
  } else {
    URL = `${API_BASE_URL}/worktime/?starttime=${starttime}`;
  }
  await axios.get(URL).then((res) => {
    worktime = res.data;
  });

  return worktime;
}

export const postWorkTimes = (payload) => {
  axios.post(`${API_BASE_URL}/worktime`, payload);
};

export const editWorkTimesByID = (id, payload) => {
  axios.put(`${API_BASE_URL}/worktime/${id}`, payload);
}

export const deleteWorkTime = (id, payload) => {
  axios.delete(`${API_BASE_URL}/worktime/${id}`, payload);
}
