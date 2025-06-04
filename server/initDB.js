const pool = require('./db');

async function initDb() {
  try {
    // Create the bookings table if it doesn't exist
    await pool.query(`
      CREATE TABLE IF NOT EXISTS bookings (
        id SERIAL PRIMARY KEY,
        emailaddress TEXT NOT NULL,
        checkindate DATE NOT NULL,
        checkoutdate DATE NOT NULL,
        numofguests INTEGER NOT NULL,
        guestname TEXT,
        roomtype TEXT,
        reference_number TEXT
      );
    `);

    // Add the reference_number column if it doesn't exist
    await pool.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1
          FROM information_schema.columns
          WHERE table_name='bookings' AND column_name='reference_number'
        ) THEN
          ALTER TABLE bookings ADD COLUMN reference_number TEXT;
        END IF;
      END$$;
    `);

    // Create the trigger function
    await pool.query(`
      CREATE OR REPLACE FUNCTION generate_reference_number()
      RETURNS TRIGGER AS $$
      DECLARE
          room_code TEXT;
          name_prefix TEXT;
      BEGIN
          room_code := CASE LOWER(NEW.roomtype)
                          WHEN 'single' THEN '100'
                          WHEN 'double' THEN '200'
                          WHEN 'suite'  THEN '300'
                          ELSE '000'
                       END;
          name_prefix := UPPER(SUBSTRING(NEW.guestname FROM 1 FOR 3));
          NEW.reference_number := room_code || name_prefix || NEW.numofguests;
          RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
    `);

    // Create the trigger if not exists
    await pool.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_trigger WHERE tgname = 'set_reference_number'
        ) THEN
          CREATE TRIGGER set_reference_number
          BEFORE INSERT ON bookings
          FOR EACH ROW
          EXECUTE FUNCTION generate_reference_number();
        END IF;
      END$$;
    `);

    console.log('Database initialized.');
    process.exit();
  } catch (err) {
    console.error('Database initialization failed:', err);
    process.exit(1);
  }
}

initDb();
