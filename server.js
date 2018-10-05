const express = require("express");
//const mongoose = require('mongoose');
const bodyParser = require("body-parser");
//const passport = require('passport');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get(`/`, (req, res) => res.send(`Hello from app/get '/'`));

const main = require(`./routes/api/main`);
app.use(`/api/main`, main);

const port = process.env.PORT || 5002;
app.listen(port, () => console.log(`Server started on ${port}`));
