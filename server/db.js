const { Pool } = require('pg');

const pool = new Pool({
  user: 'your_pg_user',
  host: 'localhost',
  database: 'mikes_hotel',
  password: 'your_pg_password',
  port: 5432, // default PostgreSQL port
});

pool.on('connect', () => {
  console.log('Connected to PostgreSQL');
});

// Optional: Create table if not exists
pool.query(`
  CREATE TABLE IF NOT EXISTS bookings (
    id SERIAL PRIMARY KEY,
    emailAddress TEXT NOT NULL,
    checkInDate DATE NOT NULL,
    checkOutDate DATE NOT NULL,
    numOfGuests INTEGER NOT NULLL
  );
`);

module.exports = pool;
