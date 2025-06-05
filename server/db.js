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


// Add error handling
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
});

module.exports = pool;
