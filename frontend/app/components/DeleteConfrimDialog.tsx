'use client'

import { useToast } from "@/hooks/use-toast"
import { useDeleteMessageMutation } from "../store/services/messagesApi"
import { Message } from "../store/types"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"

interface DeleteConfirmDialogProps {
    message: Message | null
    open: boolean
    onOpenChange: (open: boolean) => void
}

export default function DeleteConfirmDialog(
    { message, open, onOpenChange }: DeleteConfirmDialogProps
) {
    const [deleteMessage, { isLoading }] = useDeleteMessageMutation()
    const { toast } = useToast()

    const handleDelete = async () => {
        if (!message) return

        try {
            await deleteMessage(message.id).unwrap()

            toast({
                title: 'Sukces',
                description: 'Wiadomość została usunięta'
            })

            onOpenChange(false)
        } catch (err) {
            toast({
                title: 'Błąd',
                description: err?.data?.message || 'Nie udało się usunąć wiadomości',
                variant: 'destructive'
            })
        }
    }

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Czy na pewno chcesz usunąć wiadomość {message?.id}?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Wiadomość zostanie usunięta z bazy danych.
                        <br />
                        <br />
                        <strong>Wiadomość:</strong> {message?.content}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isLoading}>Anuluj</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleDelete}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Usuwanie...' : 'Usuń'}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
