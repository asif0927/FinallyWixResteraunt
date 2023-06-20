import { API_BASE_URL } from "./baseurl";
import axios from 'axios';


//get all
export const getAllLogos = async(image)=>{
  let Photos;
  let URL;
  if (!image) {
      URL = API_BASE_URL+'/logo';
  }
  else{
      URL = API_BASE_URL+`/logo/?image=${image}`
  }
  await axios.get(URL)
  .then(res =>{ 
    Photos = res.data;
  })

  return Photos
}
//post
export const postLogos = (payload)=>{
  axios.post(`${API_BASE_URL}/logo`,payload)
}
//edit
export const editLogoByID = (id,payload)=>{
  axios.put(`${API_BASE_URL}/logo/${id}`,payload)
}
//delete
export const deleteLogo = (id,payload)=>{
    axios.delete(`${API_BASE_URL}/logo/${id}`,payload)
}