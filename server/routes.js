const express = require('express');
const router = express.Router();
const db = require('./db');

// POST a new booking
router.post('/bookings', async (req, res) => {
  const { emailAddress, checkInDate, checkOutDate, numOfGuests, guestName, roomType, roomPrice, totalPrice } = req.body;

  if (!emailAddress || !checkInDate || !checkOutDate ) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const result = await db.query(
      'INSERT INTO bookings (emailaddress, checkindate, checkoutdate, numofguests, guestname, roomtype, roomprice, totalprice) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [emailAddress, checkInDate, checkOutDate, numOfGuests, guestName, roomType, roomPrice, totalPrice]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ message:'Failed to create booking',error: err.message });
  }
});

// GET all bookings
router.get('/bookings', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM bookings ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a booking by reference number
router.get('/bookings/:referenceNumber', async (req, res) => {
  const { referenceNumber } = req.params;

  try {
    const result = await db.query('SELECT * FROM bookings WHERE reference_number = $1', [referenceNumber]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching booking:', err);
    res.status(500).json({ message: 'Failed to fetch booking', error: err.message });
  }
});


// DELETE a booking by reference number
router.delete('/bookings/:referenceNumber', async (req, res) => {
  const { referenceNumber } = req.params;

  try {
    const result = await db.query('DELETE FROM bookings WHERE reference_number = $1 RETURNING *', [referenceNumber]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json({ message: 'Booking deleted successfully', deletedBooking: result.rows[0] });
  } catch (err) {
    console.error('Error deleting booking:', err);
    res.status(500).json({ message: 'Failed to delete booking', error: err.message });
  }
});


module.exports = router;
