'use client'

import { useState } from "react"
import { useGetMessagesQuery } from "../store/services/messagesApi"
import { Message } from "../store/types"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import EditMessageDialog from "./EditMessageDialog"
import DeleteConfirmDialog from "./DeleteConfrimDialog"
import { Loader2, Pencil, Trash2 } from "lucide-react"

export default function MessagesTable() {
    const { data: messages, isLoading, error } = useGetMessagesQuery()
    const [editMessage, setEditMessage] = useState<Message | null>(null)
    const [deleteMessage, setDeleteMessage] = useState<Message | null>(null)

    if (isLoading){
        return(
            <div className="flex justify-center items-center p-8 mt-10">
                <Loader2 className="animate-spin" />
                <span className="ml-2">Ładowanie wiadomości...</span>
            </div>
        )
    }

    if (error) {
        return (
            <div className="p-5 text-center bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-800">Błąd ładowania wiadomości</p>
            </div>
        )
    }

    if (!messages || messages.length === 0) {
        return (
            <div className="p-10 text-center bg-gray-50 rounded-md">
                <p className="text-gray-700">Brak wiadomości. Dodaj pierwszą wiadomość!</p>
            </div>
        )
    }

    return (
        <>
            <div className="rounded-md border bg-white shadow pt-10 px-5">
                <Table>
                    <TableCaption className="text-gray-700 font-medium">Lista wiadomości</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[5%]">ID</TableHead>
                            <TableHead>Wiadomość</TableHead>
                            <TableHead className="text-center w-150">Akcje</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {messages.map((message) => (
                            <TableRow key={message.id}>
                                <TableCell className="font-medium">{message.id}</TableCell>
                                <TableCell>{message.content}</TableCell>
                                <TableCell>
                                    <div className="flex gap-2 justify-end flex-col">
                                        <Button
                                            variant='outline'
                                            size='sm'
                                            onClick={() => setEditMessage(message)}
                                        >
                                            <Pencil className="w-4"/>
                                            Edytuj
                                        </Button>

                                        <Button
                                            variant='destructive'
                                            size='sm'
                                            onClick={() => setDeleteMessage(message)}
                                        >
                                            <Trash2 className="w-4"/>
                                            Usuń
                                        </Button>
                                    </div>
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

            <DeleteConfirmDialog
                message={deleteMessage}
                open={!!deleteMessage}
                onOpenChange={(open) => !open && setDeleteMessage(null)}
            />
        </>
    )
}