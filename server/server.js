import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pkg from 'pg';
const { Pool } = pkg;

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; font-src 'self'; style-src 'self'; script-src 'self'; img-src 'self';"
  );
  next();
});

app.use('/api', routes);

app.get('/', (req, res) => {
  res.send('Welcome to Mikes Hotel API!');
});

// Only listen locally when not in Vercel environment
if (process.env.VERCEL !== '1') {
  const PORT = process.env.PORT || 5001;
  app.listen(PORT, (error) => {
    if (error) {
      console.log(error);
    }
    console.log(`Server running on http://localhost:${PORT}`);
  }).on('error', (err) => {
    console.error('Failed to start server:', err.message);
  });
}

export default app;