import { API_BASE_URL } from "./baseurl";
import axios from 'axios';


//get all
export const getAllSocials = async(iconurl)=>{
  let Socials;
  let URL;
  if (!iconurl) {
      URL = API_BASE_URL+'/socials';
  }
  else{
      URL = API_BASE_URL+`/socials/?iconurl=${iconurl}`
  }
  await axios.get(URL)
  .then(res =>{ 
    Socials = res.data;
  })

  return Socials
}
//post
export const postSocials = (payload)=>{
  axios.post(`${API_BASE_URL}/socials`,payload)
}
//edit
export const editSocialsByID = (id,payload)=>{
  axios.put(`${API_BASE_URL}/socials/${id}`,payload)
}
//delete
export const deleteSocials = (id,payload)=>{
    axios.delete(`${API_BASE_URL}/socials/${id}`,payload)
}