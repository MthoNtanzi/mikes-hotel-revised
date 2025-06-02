const { Pool } = require('pg');

const pool = new Pool({
  user: 'mthontanzi_workdevice_01',
  host: 'localhost',
  database: 'mikes_hotel',
  password: 'Champ@12',
  port: 5432, // default PostgreSQL port
});

pool.on('connect', () => {
  console.log('Connected to PostgreSQL');
});

// Optional: Create table if not exists
pool.query(`
  CREATE TABLE IF NOT EXISTS bookings (
    id SERIAL PRIMARY KEY,
    emailaddress TEXT NOT NULL,
    checkindate DATE NOT NULL,
    checkoutdate DATE NOT NULL,
    numofguests INTEGER NOT NULL,
    guestname TEXT,
    roomtype TEXT
  );
`).catch(err => console.error('Error creating table:', err));

// Add error handling
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
});

module.exports = pool;
