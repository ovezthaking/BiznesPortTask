import express from 'express'
import { createMessage, getAllMessages, getMessageById } from '../controllers/messagesController.js'

export const messagesRouter = express.Router()

messagesRouter.get('/', getAllMessages)
messagesRouter.get('/:messageId', getMessageById)

messagesRouter.post('/', createMessage)
