const express = require('express');
const cors = require('cors');
const routes = require('./routes');

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

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
