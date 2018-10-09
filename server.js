const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// Add logging to Express ('access.log')
var fs = require("fs");
var path = require("path");
var morgan = require("morgan");

// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"), {
  flags: "a"
});

app.use(morgan("combined", { stream: accessLogStream })); // setup the logger

// @ROUTE /
app.get(`/`, (req, res) => res.send(`Hello from app/get '/'`));

// @ROUTE /api/main
const main = require(`./routes/api/main`);
app.use(`/api/main`, main);

// @ROUTE /api/practice
const practice = require(`./routes/api/practice`); // it barks!
app.use(`/api/practice`, practice);

const port = process.env.PORT || 5002;
app.listen(port, () => console.log(`Server started on ${port}`));
