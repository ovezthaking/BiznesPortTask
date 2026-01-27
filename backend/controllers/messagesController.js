import Message from "../models/Message.js"
import express from 'express'

export const getAllMessages = async (req, res, next) => {
    try {
        const messages = await Message.findAll({
            order: [['createdAt', 'DESC']]
        })

        res.json({
            success: true,
            data: messages
        })
    } catch (err) {
        next(err)
    }
}

export const getMessageById = async (req, res, next) => {
    const { messageId } = req.params

    try {
        const message = await Message.findByPk(messageId)

        if (!message) {
            return res.status(404).json({
                success: false,
                message: 'Wiadomość nieznaleziona'
            })
        }

        res.json({
            success: true,
            data: message
        })
    } catch (err) {
        next(err)
    }
}

export const createMessage = async (req, res, next) {
    
}
