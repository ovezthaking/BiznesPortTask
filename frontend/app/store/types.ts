export interface Message {
    id: number,
    content: string,
    createdAt: string,
    updatedAt: string,
}

export type MessageResponse = {
    success: boolean,
    data: Message | Message[]
    message?: string,
}
