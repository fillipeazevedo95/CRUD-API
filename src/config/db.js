import mongoose from 'mongoose'
import { logger } from '../lib/logger'

export const connection = async () => {
  try {
    const connectionParams = {
      useNewUrlParser: true
    }
    await mongoose.connect(process.env.DB, connectionParams)
    logger.info('connected to database')
  } catch (error) {
    logger.info('could not connect to database', error)
  }
}
