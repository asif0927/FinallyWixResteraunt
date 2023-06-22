import { API_BASE_URL } from "./baseurl";
import axios from 'axios';


//get all
export const getAllService = async(desc)=>{
  let Services;
  let URL;
  if (!desc) {
      URL = API_BASE_URL+'/service';
  }
  else{
      URL = API_BASE_URL+`/service/?desc=${desc}`
  }
  await axios.get(URL)
  .then(res =>{ 
   Services = res.data;
  })

  return Services
}
//post
export const postService = (payload)=>{
  axios.post(`${API_BASE_URL}/service`,payload)
}
//edit
export const editServiceByID = (id,payload)=>{
  axios.put(`${API_BASE_URL}/service/${id}`,payload)
}
//delete
export const deleteServices = async (id) => {
  await axios.delete(`${API_BASE_URL}/service/${id}`);
};
