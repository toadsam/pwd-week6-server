const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('../cors-config');

const notFound = require('./middleware/notFound.middleware');
const errorHandler = require('./middleware/error.middleware');

const authRoutes = require('./routes/auth.routes');
const restaurantRoutes = require('./routes/restaurants.routes');
const submissionRoutes = require('./routes/submissions.routes');
const userRoutes = require('./routes/users.routes');

const app = express();

app.use(cors);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.json({ ok: true, service: 'pwd-week6-server' });
});

app.use('/api/auth', authRoutes);
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/submissions', submissionRoutes);
app.use('/api/users', userRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;

