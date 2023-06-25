import axios from 'axios';
import { API_BASE_URL } from './baseurl';

export const createReservation = async (reservationData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/reservation`, reservationData);

    console.log('Reservation created:', response.data);
  } catch (error) {
    console.error('Failed to create reservation:', error.message);
  }
};


export const getReservations = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/reservation`);

    console.log('Reservations:', response.data);
   

  } catch (error) {
    console.error('Failed to retrieve reservations:', error.message);
   
  }
};

const acceptReservation = async (reservationId) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/reservation/${reservationId}/accept`);

    console.log('Reservation accepted:', response.data);
   
  } catch (error) {
    console.error('Failed to accept reservation:', error.message);
  
  }
};


const rejectReservation = async (reservationId) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/reservation/${reservationId}/reject`);

    console.log('Reservation rejected:', response.data);

  } catch (error) {
    console.error('Failed to reject reservation:', error.message);
  }
};

