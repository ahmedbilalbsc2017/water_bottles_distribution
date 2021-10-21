require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
// const cors = require('cors');
// const bodyParser = require('body-parser');

const authRoutes = require('./routes/user');
const stockRoutes = require('./routes/stock');

const app = express();
const port = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// app.use(cors());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  // res.setHeader(
  //   'Access-Control-Allow-Headers',
  //   'Content-Type, application/json'
  // );

  next();
});

/******************************************/

app.use('/stock', stockRoutes);
app.use('/auth', authRoutes);

/*****************************************/

//DB & Server Connection
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    app.listen(port, () => {
      console.log(`Server Connected at port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
