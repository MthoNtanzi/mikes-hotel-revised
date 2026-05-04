import pool from './db.js';

async function initDb() {
  try {
    // Create the bookings table if it doesn't exist
    await pool.query(`
      CREATE TABLE IF NOT EXISTS bookings (
        id SERIAL PRIMARY KEY,
        reference_number TEXT UNIQUE,
        emailaddress TEXT NOT NULL,
        checkindate DATE NOT NULL,
        checkoutdate DATE NOT NULL,
        numofguests INTEGER NOT NULL,
        guestname TEXT,
        roomtype TEXT,
        roomprice DECIMAL(10, 2) NOT NULL,
        totalprice DECIMAL(10, 2) NOT NULL
      );
    `);

    // Create the trigger function
    // Pattern: MH-20250504-00042
    // Date part uses the check-in date; ID is the auto-increment PK — always unique
    await pool.query(`
      CREATE OR REPLACE FUNCTION generate_reference_number()
      RETURNS TRIGGER AS $$
      DECLARE
        date_part TEXT;
      BEGIN
        date_part := TO_CHAR(NEW.checkindate, 'YYYYMMDD');
        NEW.reference_number := 'MH-' || date_part || '-' || LPAD(NEW.id::TEXT, 5, '0');
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
    `);

    // Drop and recreate trigger to pick up any function changes
    await pool.query(`DROP TRIGGER IF EXISTS set_reference_number ON bookings;`);

    await pool.query(`
      CREATE TRIGGER set_reference_number
      BEFORE INSERT ON bookings
      FOR EACH ROW
      EXECUTE FUNCTION generate_reference_number();
    `);

    console.log('Database initialized successfully.');
    process.exit(0);
  } catch (err) {
    console.error('Database initialization failed:', err);
    process.exit(1);
  }
}

initDb();