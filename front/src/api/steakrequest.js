import { API_BASE_URL } from "./baseurl";
import axios from 'axios';


//get all
export const getAllSteakes = async(url)=>{
  let Steakes;
  let URL;
  if (!title) {
      URL = API_BASE_URL+'/steaks';
  }
  else{
      URL = API_BASE_URL+`/steaks/?url=${url}`
  }
  await axios.get(URL)
  .then(res =>{ 
    Steakes = res.data;
  })

  return Steakes
}
//post
export const postSteakes = (payload)=>{
  axios.post(`${API_BASE_URL}/steaks`,payload)
}
//edit
export const editSteaksByID = (id,payload)=>{
  axios.put(`${API_BASE_URL}/steaks/${id}`,payload)
}
//delete
//edit
export const deleteSteaks = (id,payload)=>{
    axios.delete(`${API_BASE_URL}/steaks/${id}`,payload)
}