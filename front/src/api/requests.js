import { API_BASE_URL } from "./baseurl";
import axios from 'axios';


//sign up
export const signUP = async(payload)=>{
  const response = await axios.post(`${API_BASE_URL}/api/register`,payload);
  return response;
}
//sign in
export const signIN = async(payload)=>{
const response = await axios.post(`${API_BASE_URL}/api/login`,payload);
console.log(response);
return response.data;
}
//get users
export const getUsers = async(token)=>{
  let users;
  await axios.get(`${API_BASE_URL}/api/users`,{
      headers: {
          'x-access-token': token 
      }
  }).then((res)=>{
      users = res.data.data;
  })
  return users;
}
