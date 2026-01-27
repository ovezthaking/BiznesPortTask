import express from 'express'
import { getAllMessages, getMessageById } from '../controllers/messagesController.js'

export const messagesRouter = express.Router()

messagesRouter.get('/', getAllMessages)
messagesRouter.get('/:messageId', getMessageById)
