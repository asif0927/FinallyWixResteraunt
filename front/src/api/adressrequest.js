import { API_BASE_URL } from "./baseurl";
import axios from 'axios';


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