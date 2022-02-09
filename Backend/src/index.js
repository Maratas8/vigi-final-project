const express = require('express');
const cors = require('cors');

const { port } = require('./config');

const authRoutes = require('./controllers/auth');
const roomRoutes = require('./controllers/rooms');
const reservationRoutes = require('./controllers/reservations');

const app = express();

app.use(express.json());
app.use(cors());
app.use(authRoutes, roomRoutes, reservationRoutes);

app.all('*', (req, res) => {
  res.status(404).send({ error: 'Page not found' });
});

app.listen(port, () => console.log(`Server is running at http://localhost:${port}`));
