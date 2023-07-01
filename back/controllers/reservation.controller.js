const Reservation = require('../models/reservation.model');
const nodemailer = require('nodemailer');


exports.createReservation = async (req, res) => {
  try {
    const { partySize, date, time, email } = req.body;

    const reservation = await Reservation.create({ partySize, date, time, email });

    
    sendEmail(email, 'Reservation Successful', 'Your reservation has been successfully created.');

    res.status(201).json(reservation);
  } catch (error) {
    console.error('Failed to create reservation:', error);
    res.status(500).json({ message: 'Failed to create reservation' });
  }
};

exports.editReservation = async (req, res) => {
  try {
    const reservationId = req.params.id;
    const { partySize, date, time, email } = req.body;

    const updatedReservation = await Reservation.findByIdAndUpdate(
      reservationId,
      { partySize, date, time, email },
      { new: true }
    );

    if (!updatedReservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }

    sendEmail(email, 'Reservation Updated', 'Your reservation has been successfully updated.');

    res.json(updatedReservation);
  } catch (error) {
    console.error('Failed to edit reservation:', error);
    res.status(500).json({ message: 'Failed to edit reservation' });
  }
};


exports.getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.status(200).json(reservations);
  } catch (error) {
    console.error('Failed to retrieve reservations:', error);
    res.status(500).json({ message: 'Failed to retrieve reservations' });
  }
};


exports.acceptReservation = async (req, res) => {
  try {
    const { id } = req.params;

    
    const reservation = await Reservation.findByIdAndUpdate(id, { status: 'accepted' }, { new: true });

    
    sendEmail(reservation.email, 'Reservation Accepted', 'Your reservation has been accepted.');

    res.status(200).json(reservation);
  } catch (error) {
    console.error('Failed to accept reservation:', error);
    res.status(500).json({ message: 'Failed to accept reservation' });
  }
};


exports.rejectReservation = async (req, res) => {
  try {
    const { id } = req.params;

    
    const reservation = await Reservation.findByIdAndUpdate(id, { status: 'rejected' }, { new: true });

   
    sendEmail(reservation.email, 'Reservation Rejected', 'Your reservation has been rejected.');

    res.status(200).json(reservation);
  } catch (error) {
    console.error('Failed to reject reservation:', error);
    res.status(500).json({ message: 'Failed to reject reservation' });
  }
};


const sendEmail = (to, subject, message) => {
 
  const transporter = nodemailer.createTransport({
    service: 'smtp.elasticemail.com',
    auth: {
      user: 'haqverdizadeasif177@gmail.com',
      pass: '4E18FEC0A030B8221AAC03534281FCE9AA27'
    }
  });


  transporter.sendMail({
    from: 'haqverdizadeasif177@gmail.com',
    to,
    subject,
    text: message
  }, (error, info) => {
    if (error) {
      console.error('Failed to send e-mail:', error);
    } else {
      console.log('E-mail sent:', info.response);
    }
  });
};
