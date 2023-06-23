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


export const editSteakesByID = async (id, payload) => {
  try {
    const { title, url } = payload;

    const response = await axios.put(`${API_BASE_URL}/steaks/${id}`, { title });

    const publicId = extractPublicIdFromUrl(url);

    await axios.post(
      `https://api.cloudinary.com/v1_1/du9areque/image/upload/${publicId}`,
      { title }
    );

    return response.data;
  } catch (error) {
    console.error("Error editing steaks:", error);
    throw error;
  }
};

const extractPublicIdFromUrl = (url) => {
  const publicIdRegex = /\/([^/]+)(\.[^.]+)?$/;
  const match = url.match(publicIdRegex);
  return match ? match[1] : null;
};


export const deleteSteakes = (id, payload) => {
  axios.delete(`${API_BASE_URL}/steaks/${id}`, payload);
}
