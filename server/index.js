const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors');

mongoose.connect(
  process.env.DB_AUTH,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    app.listen(PORT, () => {
      console.log(`APP is listening at PORT ${PORT}`);
    });
  }
);
const authRoutes = require('./routes/auth');
const tvShowRoutes = require('./routes/tvshow');

//Middlewares
app.use(bodyParser.json());
app.use(cors());

app.use('/api', authRoutes);
app.use('/api', tvShowRoutes);

//error handling for express-jwt authentication
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('invalid token...');
  }
});
