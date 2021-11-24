const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config();

// START
const app = express();

// PORT
const PORT = process.env.PORT || 8080;

// SETUP BODY PARSER
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// HELMET AND CORS
app.use(helmet());
app.use(cors());

// 404 - ROTA
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err)
});

// ROTA - 422, 500, 401
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    if (err.status !== 404) console.warn("Error: ", err.message, new Date());
    res.json(err);
});

// LISTENING
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`))