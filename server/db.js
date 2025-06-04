const { Pool } = require('pg');

const pool = new Pool({
  user: 'mikes_hotel_user',
  host: 'dpg-d105ogbe5dus739bkohg-a',
  database: 'mikes_hotel',
  password: 'ImYBnA54Ni4oCoR8bVc7HRz7MtABe1jO',
  port: 5432, // default PostgreSQL port
  ssl: {
    rejectUnauthorized: false // required by Render
  }
});

pool.on('connect', () => {
  console.log('Connected to PostgreSQL');
});


// Add error handling
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
});

module.exports = pool;
