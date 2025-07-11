const express = require('express');
const router = express.Router();
const db = require('./db');
const nodemailer = require('nodemailer');

// POST a new booking
router.post('/bookings', async (req, res) => {
  const { emailAddress, checkInDate, checkOutDate, numOfGuests, guestName, roomType, roomPrice, totalPrice } = req.body;

  if (!emailAddress || !checkInDate || !checkOutDate) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const result = await db.query(
      'INSERT INTO bookings (emailaddress, checkindate, checkoutdate, numofguests, guestname, roomtype, roomprice, totalprice) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [emailAddress, checkInDate, checkOutDate, numOfGuests, guestName, roomType, roomPrice, totalPrice]
    );

    const newBooking = result.rows[0]; // contains reference_number
    const reference = newBooking.reference_number;

    // Setup mail transporter
    let transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp.gmail.com',
      port: process.env.EMAIL_PORT || 587,
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Compose email
    let mailOptions = {
      from: `"Mike's Hotel | Reservations" <${process.env.EMAIL_USER}>`,
      to: emailAddress,
      subject: `Booking Confirmation for ${guestName}!`,
      html: `
      <h1 style="margin: auto; text-align:center; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #2c3e50;">Mikes Hotel</h1>
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
        <h2 style="color: #2c3e50;">Thank you for your booking, ${guestName}!</h2>

        <p style="margin: 0 0 10px;"><strong>📌 Room:</strong> ${roomType}</p>
        <p style="margin: 0 0 10px;"><strong>📅 Check-in:</strong> ${checkInDate}</p>
        <p style="margin: 0 0 10px;"><strong>📅 Check-out:</strong> ${checkOutDate}</p>
        <p style="margin: 0 0 10px;"><strong>👥 Guests:</strong> ${numOfGuests}</p>
        <p style="margin: 0 0 10px;"><strong>💰 Total Price:</strong> <span style="color: #27ae60;">ZAR ${totalPrice}</span></p>

        <hr style="margin: 20px 0;" />

        <p style="margin: 0 0 10px;"><strong>🔐 Booking Reference:</strong> <code style="background: #f4f4f4; padding: 4px 8px; border-radius: 4px;">${reference}</code></p>

        <p style="margin: 20px 0;">
          <a href="https://mikes-hotel-revised.vercel.app/reservation?ref=${reference}" target="_blank" style="background-color: #2c3e50; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
            🔎 View Your Booking Online
          </a>
        </p>

        <p style="font-size: 14px; color: #555;">Please keep this reference safe — you'll need it to view, or cancel your booking.</p>

        <p style="margin-top: 30px; font-size: 12px; color: #999;">
          If you did not make this booking or believe this message was sent in error, please contact our support team.
        </p>
      </div>
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ message: 'Failed to create booking', error: err.message });
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
