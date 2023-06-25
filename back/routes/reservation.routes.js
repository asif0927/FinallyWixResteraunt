const express = require('express');
const reservation_router = express.Router();
const reservationController = require('../controllers/reservation.controller');

// Rezervasyon oluşturma
reservation_router.post('/', reservationController.createReservation);

// Rezervasyonları listeleme
reservation_router.get('/', reservationController.getReservations);

// Rezervasyonu kabul etme
reservation_router.put('/:id/accept', reservationController.acceptReservation);

// Rezervasyonu reddetme
reservation_router.put('/:id/reject', reservationController.rejectReservation);

module.exports = reservation_router;
