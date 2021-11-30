// PACKAGES
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const morganBody = require('morgan-body');
const connection = require('./src/db')
require('dotenv').config();

const logger = require('./src/logger')
const pinoHttp = require('pino-http')({ logger })

// START
const app = express();

// CONNECTION TO DATABASE
connection();

// PORT
const PORT = process.env.PORT || 8080;

// SETUP BODY PARSER
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// PINO HTTP
app.use(pinoHttp);

// HELMET AND CORS
app.use(helmet());
app.use(cors());

// MORGAN
morganBody(app);

// ROUTES
const users = require('./src/routes/users');
const auth = require('./src/routes/auth');
const { default: pino } = require('pino');
app.use('/api/users', users);
app.use('/api/login', auth);

// BASE ROUTE
app.get('/', (req, res) => {
    res.send("CRUD Running...");
});

// 404 - ROUTE
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// ROUTE - 422, 500, 401
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    if (err.status !== 404) logger.warn("Error: ", err.message, new Date());
    res.json(err);
});

// LISTENING
app.listen(PORT, () => logger.info(`Listening on port ${PORT}...`))