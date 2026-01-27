import { validationResult } from "express-validator"
import Message from "../models/Message.js"
import express from 'express'

export const getAllMessages = async (req, res, next) => {
    let { order } = req.query

    if (!order || !['asc', 'ASC', 'desc', 'DESC'].includes(order)){
        order = 'DESC'
    }

    try {
        const messages = await Message.findAll({
            order: [['createdAt', order]]
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

export const createMessage = async (req, res, next) => {
    const { content } = req.body

    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            })
        }

        const message = await Message.create({
            content
        })

        res.status(201).json({
            success: true,
            data: message,
            message: 'Wiadomość pomyślnie utworzona'
        })
    } catch (err) {
        next(err)
    }
}

export const updateMessage = async (req, res, next) => {
    const { messageId } = req.params
    const { content } = req.body

    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            })
        }

        const message = await Message.findByPk(messageId)

        if (!message){
            return res.status(404).json({
                success: false,
                message: 'Wiadomość nieznaleziona'
            })
        }

        message.content = content
        await message.save()

        res.json({
            success: true,
            data: message,
            message: 'Wiadomość zaaktualizowana'
        })
    } catch (err) {
        next(err)
    }
}

export const deleteMessage = async (req, res, next) => {
    const { messageId } = req.params

    try {
        const message = await Message.findByPk(messageId)

        if (!message) {
            return res.status(404).json({
                success: false,
                message: 'Wiadomość nieznaleziona'
            })
        }

        await message.destroy()

        res.json({
            success: true,
            message: 'Wiadomość usunięta'
        })
    } catch (err) {
        next(err)
    }
}
