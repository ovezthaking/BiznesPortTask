'use client'

import { useToast } from "@/hooks/use-toast"
import { useCreateMessageMutation } from "../store/services/messagesApi"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"


export default function MessageForm() {
    const [content, setContent] = useState('')
    const [createMessage, { isLoading }] = useCreateMessageMutation()
    const { toast } = useToast()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

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
            await createMessage({ content }).unwrap()

            toast({
                title: 'Sukces',
                description: 'Wiadomość została wysłana'
            })

            setContent('')
        } catch (err: unknown) {
            toast({
                title: 'Błąd',
                description: err?.data?.message || 'Nie udało się wysłać wiadomości',
                variant: 'destructive'
            })
        }
    }

    return (
        <form action="post" onSubmit={handleSubmit}>
            <div>
                <Label htmlFor="message">Nowa wiadomość</Label>
                <Textarea 
                    id="message"
                    placeholder="Wpisz wiadomość..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    disabled={isLoading}
                    rows={5}
                />
                <p>
                    {content.length}/1000 znaków
                </p>
            </div>

            <Button
                type="submit"
                disabled={isLoading}
            >
                {isLoading ? 'Dodawanie...' : 'Wyślij'}
            </Button>
        </form>
    )
}