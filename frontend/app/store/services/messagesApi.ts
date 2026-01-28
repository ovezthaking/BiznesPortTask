import type { Message, MessageResponse } from "../types.js";
import { CreateApi, createApi, EndpointDefinitions, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const messagesApi = createApi({
    reducerPath: 'messagesApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/api/messages'
    }),
    tagTypes: ['Message'],
    endpoints: (builder) => ({
        getMessages: builder.query<Array<Message>, string | void>({
            query: (order = 'DESC') => `?order=${order}`,
            transformResponse: (response: MessageResponse) => {
                return Array.isArray(response.data) ? response.data : []
            },
            providesTags: ['Message'],
        }),

        getMessage: builder.query<Message, number>({
            query: (messageId) => `/${messageId}`,
            transformResponse: (response: MessageResponse) => {
                return response.data as Message
            },
            providesTags: ['Message']
        }),

        createMessage: builder.mutation<Message, { content: string }>({
            query: (body) => ({
                url: '/',
                method: 'POST',
                body,
            }),
            transformResponse: (response: MessageResponse) => {
                return response.data as Message
            },
            invalidatesTags: ['Message']
        }),

        updateMessage: builder.mutation<Message, { messageId: number, content: string }>({
            query: ({ messageId, content }) => ({
                url: `/${messageId}`,
                method: 'PUT',
                body: { content }
            }),
            transformResponse: (response: MessageResponse) => {
                return response.data as Message
            },
            invalidatesTags: ['Message']
        }),

        deleteMessage: builder.mutation<void, number>({
            query: (messageId) => ({
                url: `/${messageId}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Message']
        })
    })
})

export const {
    useGetMessagesQuery,
    useGetMessageQuery,
    useCreateMessageMutation,
    useUpdateMessageMutation,
    useDeleteMessageMutation
} = messagesApi