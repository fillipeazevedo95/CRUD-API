// PACKAGES
// const connection from './config/db')
import { connection } from './config/db'
import express from 'express'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import cors from 'cors'
import morganBody from 'morgan-body'
import { userRouter } from './routes/users'
import { authRouter } from './routes/auth'

import { logger } from './lib/logger'
import pinoHttp from 'pino-http'
import dotenv from 'dotenv'
dotenv.config()
pinoHttp({ logger })

// START
const app = express()

// CONNECTION TO DATABASE
connection()

// PORT
const PORT = process.env.PORT || 8080

// SETUP BODY PARSER
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// PINO HTTP
app.use(pinoHttp)

// HELMET AND CORS
app.use(helmet())
app.use(cors())

// MORGAN
morganBody(app)

// ROUTES
app.use('/api/users', userRouter)
app.use('/api/login', authRouter)

// BASE ROUTE
app.get('/', (req, res) => {
  res.send('CRUD Running...')
})

// 404 - ROUTE
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// ROUTE - 422, 500, 401
app.use((err, req, res, next) => {
  res.status(err.status || 500)
  if (err.status !== 404) logger.warn('Error: ', err.message, new Date())
  res.json(err)
})

// LISTENING
app.listen(PORT, () => logger.info(`Listening on port ${PORT}...`))
