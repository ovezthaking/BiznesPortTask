import express from 'express'
import { createMessage, deleteMessage, getAllMessages, getMessageById, updateMessage } from '../controllers/messagesController.js'
import { validateMessage } from '../middleware/validateMessage.js'

export const messagesRouter = express.Router()

messagesRouter.get('/', getAllMessages)
messagesRouter.get('/:messageId', getMessageById)

messagesRouter.post('/', validateMessage, createMessage)

messagesRouter.put('/:messageId', validateMessage, updateMessage)

messagesRouter.delete('/:messageId', deleteMessage)
