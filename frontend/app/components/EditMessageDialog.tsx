'use client'

import { useEffect, useState } from "react"
import type { Message } from "../store/types"
import { useUpdateMessageMutation } from "../store/services/messagesApi"
import { useToast } from "@/hooks/use-toast"
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogHeader, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

interface EditMessageDialogProps {
    message: Message | null,
    open: boolean,
    onOpenChange: (open: boolean) => void
}

export default function EditMessageDialog(
    { message, open, onOpenChange }: EditMessageDialogProps
) {
    const [content, setContent] = useState('')
    const [updateMessage, { isLoading }] = useUpdateMessageMutation()
    const { toast } = useToast()

    useEffect(() => {
        if (message) {
            setContent(message.content)
        }
    }, [message])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!message) return

        if (!content.trim()){
            toast({
                title: 'Brak treści',
                description: 'Wiadomość nie może być pusta',
                variant: 'destructive'
            })
            return
        }

        if (content.length < 1 || content.length > 1000){
            toast({
                title: 'Nieprawidłowa ilość znaków',
                description:'Liczba znaków w wiadomości musi mieścić się w przedziale od 1 do 1000 znaków',
                variant: 'destructive'
            })
            return
        }

        try {
            await updateMessage({
                messageId: message.id,
                content
            }).unwrap()

            toast({
                title: 'Sukces',
                description: 'Wiadomość zaaktualizowana'
            })

            onOpenChange(false)
        } catch (err) {
            toast({
                title: 'Błąd',
                description: err?.data?.message || 'Nie udało się zaaktualizować wiadomości',
                variant: 'destructive'
            })            
        }
    }

        return (
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent>
                    <form onSubmit={handleSubmit}>
                        <DialogHeader>
                            <DialogTitle>Edytuj wiadomość</DialogTitle>
                            <DialogDescription>
                                Wprowadź zmiany i kliknij przycisk &ldquo;zapisz&ldquo;
                            </DialogDescription>
                        </DialogHeader>

                        <div>
                            <div className="mt-5">
                                <Label htmlFor="edit-message">Treść wiadomości</Label>
                                <Textarea 
                                    id="edit-message"
                                    placeholder="Wpisz wiadomość..."
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    disabled={isLoading}
                                    rows={5}
                                />
                                <p className="text-sm text-gray-500">
                                    {content.length}/1000 znaków
                                </p>
                            </div>
                        </div>

                        <DialogFooter>
                            <Button
                                type="button"
                                variant='outline'
                                onClick={() => onOpenChange(false)}
                                disabled={isLoading}
                            >
                                Anuluj
                            </Button>
                            <Button type="submit" disabled={isLoading}>
                                {isLoading ? 'Zapisywanie...' : 'Zapisz zmiany'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        )
}
