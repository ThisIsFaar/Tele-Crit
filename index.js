const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors');

const authRoutes = require('./routes/auth');
const tvShowRoutes = require('./routes/tvshow');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;
connectDB();

//Middlewares
app.use(bodyParser.json());
app.use(cors());

app.use('/api', authRoutes);
app.use('/api', tvShowRoutes);

//error handling for express-jwt authentication
// app.use((err, req, res, next) => {
//   if (err.name === 'UnauthorizedError') {
//     res.status(401).send('invalid token...');
//   }
// });

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.listen(PORT, () => {
  console.log(`APP is listening at PORT: ${PORT}`);
});
