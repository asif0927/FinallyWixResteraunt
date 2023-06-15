import { API_BASE_URL } from "./baseurl";
import axios from 'axios';

/*export const getAllAddresses = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/addresses`);

    if (response.status === 200) {
      const addresses = response.data;
      return addresses;
    } else {
      throw new Error('Failed to retrieve addresses');
    }
  } catch (error) {
    console.error('Error:', error.message);
    throw error;
  }
};

export const updateAddress = async (id, updatedData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/api/addresses/${id}`, updatedData);

    if (response.status === 200) {
      const updatedAddress = response.data;
      return updatedAddress;
    } else {
      throw new Error('Failed to update address');
    }
  } catch (error) {
    console.error('Error:', error.message);
    throw error;
  }
};
*/
//get all
export const getAllAddresses = async(city)=>{
  let Adresses;
  let URL;
  if (!city) {
      URL = API_BASE_URL+'/adresses';
  }
  else{
      URL = API_BASE_URL+`/adresses/?city=${city}`
  }
  await axios.get(URL)
  .then(res =>{ 
    Adresses = res.data;
  })

  return Adresses
}
//post
export const postAdresses = (payload)=>{
  axios.post(`${API_BASE_URL}/adresses`,payload)
}
//edit
export const editAdressByID = (id,payload)=>{
  axios.put(`${API_BASE_URL}/adresses/${id}`,payload)
}