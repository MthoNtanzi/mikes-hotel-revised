const express = require('express');
const router = express.Router();
const db = require('./db');

// POST a new booking
router.post('/bookings', async (req, res) => {
  const { emailAddress, checkInDate, checkOutDate, numOfGuests } = req.body;

  if (!emailAddress || !checkInDate || !checkOutDate ) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const result = await db.query(
      'INSERT INTO bookings (emailAddress, checkInDate, checkOutDate, numOfGuests) VALUES ($1, $2, $3, $4) RETURNING *',
      [emailAddress, checkInDate, checkOutDate, numOfGuests]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
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

module.exports = router;
