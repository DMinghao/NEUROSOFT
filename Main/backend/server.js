const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const surveyRouter = require('./routes/API/survey');
const usersRouter = require('./routes/API/users');

app.use('/API/survey', surveyRouter);
app.use('/API/users', usersRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
