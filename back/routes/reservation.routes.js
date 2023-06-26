const express = require('express');
const reservation_router = express.Router();
const reservationController = require('../controllers/reservation.controller');


reservation_router.post('/', reservationController.createReservation);

reservation_router.get('/', reservationController.getReservations);

reservation_router.put('/:id/accept', reservationController.acceptReservation);

reservation_router.put('/:id/reject', reservationController.rejectReservation);

module.exports = reservation_router;
