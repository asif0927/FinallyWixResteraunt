import { API_BASE_URL } from "./baseurl";
import axios from 'axios';


//get all
export const getAllGifs = async(giffile)=>{
  let Gifs;
  let URL;
  if (!giffile) {
      URL = API_BASE_URL+'/gifs';
  }
  else{
      URL = API_BASE_URL+`/gifs/?giffile=${giffile}`
  }
  await axios.get(URL)
  .then(res =>{ 
    Gifs = res.data;
  })

  return Gifs
}
//post
export const postGifs = (payload)=>{
  axios.post(`${API_BASE_URL}/gifs`,payload)
}
//edit
export const editGifByID = (id,payload)=>{
  axios.put(`${API_BASE_URL}/gifs/${id}`,payload)
}
//delete
export const deleteGif = (id,payload)=>{
    axios.delete(`${API_BASE_URL}/gifs/${id}`,payload)
}