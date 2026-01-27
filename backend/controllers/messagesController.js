import Message from "../models/Message.js"

export const getAllMessages = async (req, res, next) => {
    try {
        const messages = await Message.findAll({
            order: [['createdAt', 'DESC']]
        })

        res.json({
            success: true,
            data: messages
        })
    } catch (e) {
        next(e)
    }
}
