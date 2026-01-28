'use client'

import { useToast } from "@/hooks/use-toast"
import { useCreateMessageMutation } from "../store/services/messagesApi"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useState } from "react"


export default function MessageForm() {
    const [content, setContent] = useState('')
    const [createMessage, { isLoading }] = useCreateMessageMutation()
    const { toast } = useToast()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

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
                <Label></Label>
                <Input 
                    id="message"
                    type="text"
                    placeholder="Wpisz wiadomość..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    disabled={isLoading}
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