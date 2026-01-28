'use client'

import { useState } from "react"
import { useGetMessagesQuery } from "../store/services/messagesApi"
import { Message } from "../store/types"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import EditMessageDialog from "./EditMessageDialog"

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
        <>
            <div>
                <Table>
                    <TableCaption>Lista wiadomości</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Wiadomość</TableHead>
                            <TableHead>Akcje</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {messages.map((message) => (
                            <TableRow key={message.id}>
                                <TableCell>{message.id}</TableCell>
                                <TableCell>{message.content}</TableCell>
                                <TableCell>
                                    <Button
                                        variant='outline'
                                        size='sm'
                                        onClick={() => setEditMessage(message)}
                                    >
                                        Edytuj
                                    </Button>

                                    <Button
                                        variant='destructive'
                                        size='sm'
                                        onClick={() => setDeleteMessage(message)}
                                    >
                                        Usuń
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <EditMessageDialog
                message={editMessage}
                open={!!editMessage}
                onOpenChange={(open) => !open && setEditMessage(null)}
            />
        </>
    )
}