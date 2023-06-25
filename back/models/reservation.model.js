const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  partySize: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending'
  }
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;
