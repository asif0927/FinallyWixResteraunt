import { API_BASE_URL } from "./baseurl";
import axios from 'axios';


//get all
export const getAllGallerys = async(img)=>{
  let Gallerys;
  let URL;
  if (!img) {
      URL = API_BASE_URL+'/gallery';
  }
  else{
      URL = API_BASE_URL+`/gallery/?img=${img}`
  }
  await axios.get(URL)
  .then(res =>{ 
    Gallerys = res.data;
  })

  return Gallerys
}
//post
export const postGalerrys = (payload)=>{
  axios.post(`${API_BASE_URL}/gallery`,payload)
}
//edit
export const editGalleryByID = (id,payload)=>{
  axios.put(`${API_BASE_URL}/gallery/${id}`,payload)
}
//delete
export const deleteGallery = (id,payload)=>{
    axios.delete(`${API_BASE_URL}/gallery/${id}`,payload)
}