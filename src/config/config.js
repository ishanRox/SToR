// config.js
const config = {
  app: {
    port: 3000,
  },
};

// app.js
const express = require("express");
const router = express.Router();
const app = express();
const bodyParser = require("body-parser");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

exports.app = app;
exports.router = router;
