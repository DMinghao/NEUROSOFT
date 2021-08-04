const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require("path");

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({limit: '100mb'}));
app.use(express.urlencoded({limit: '100mb'}));
if (process.env.MODE === "BUILD") app.use(express.static(path.join(__dirname, "../build")));

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const surveyRouter = require('./routes/API/survey');
const usersRouter = require('./routes/API/users');
const templatesRouter = require('./routes/API/templates');
const disRouter = require('./routes/API/distribution')

app.use('/API/survey', surveyRouter);
app.use('/API/users', usersRouter);
app.use('/API/templates', templatesRouter);
app.use('/API/distribution', disRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
