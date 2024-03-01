import React, {useEffect, useState} from 'react'
import axios from 'axios';
import {todolistsApi} from '../api/todolists-api';

export default {
    title: 'API',
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsApi.getTodolists()
            .then(res => setState(res.data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const title = 'Hey hey'
        todolistsApi.createTodolist(title)
            .then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '418ac7c5-c34a-4909-bae0-294ae475e15d'
        todolistsApi.deleteTodolist(todolistId)
            .then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const newTitle = 'INCUBATOR-NEW'
        const todolistId = '418ac7c5-c34a-4909-bae0-294ae475e15d'
        todolistsApi.updateTodolist(todolistId, newTitle)
            .then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}