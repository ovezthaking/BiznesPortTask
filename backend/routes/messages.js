import express from 'express'
import { getAllMessages } from '../controllers/messagesController.js'

export const messagesRouter = express.Router()

messagesRouter.get('/', getAllMessages)
