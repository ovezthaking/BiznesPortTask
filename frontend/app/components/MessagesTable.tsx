'use client'

import { useState } from "react"
import { useGetMessagesQuery } from "../store/services/messagesApi"
import { Message } from "../store/types"

export default function MessagesTable() {
    const { data: messages, isLoading, error } = useGetMessagesQuery()
    const [editMessage, setEditMessage] = useState<Message | null>(null)
    const [deleteMessage, setDeleteMessage] = useState<Message | null>(null)

    if (isLoading){
        return(
            <div>
                <span>Ładowanie wiadomości...</span>
            </div>
        )
    }

    if (error) {
        return (
            <div>
                <p>Błąd ładowania wiadomości</p>
            </div>
        )
    }

    if (!messages || messages.length === 0) {
        return (
            <div>
                <p>Brak wiadomości. Dodaj pierwszą wiadomość!</p>
            </div>
        )
    }

    return (
        <p>Message Table</p>
    )
}