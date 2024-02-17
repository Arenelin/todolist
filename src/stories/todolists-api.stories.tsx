import React, {ChangeEvent, useEffect, useState} from 'react'
import {todolistsAPI} from '../api/todolists-api';

export default {
    title: 'API-Todolists'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsAPI.getTodolists()
            .then((res) => setState(res.data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState('')

    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>)=>{
        setTitle(e.currentTarget.value)
    }
    const addTodolist = ()=>{
        todolistsAPI.createTodolist(title)
            .then((res) => setState(res.data))
        setTitle('')
    }

    return (
        <div>
            <input placeholder={'Type todolist title'} onChange={onChangeHandler} value={title}/>
            <button onClick={addTodolist}>Add new todolist</button>
            <div>{JSON.stringify(state)}</div>
        </div>
    )
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState('')

    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>)=>{
        setTodolistId(e.currentTarget.value)
    }
    const deleteTodolist = ()=>{
        todolistsAPI.deleteTodolist(todolistId)
            .then((res) => setState(res.data))
        setTodolistId('')
    }

    return (
        <div>
            <input placeholder={'Type todolist id for delete'} onChange={onChangeHandler} value={todolistId}/>
            <button onClick={deleteTodolist}>Delete todolist</button>
            <div>{JSON.stringify(state)}</div>
        </div>
    )
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState('')
    const [newTitle, setNewTitle] = useState('')

    const onChangeTodolistIdHandler = (e:ChangeEvent<HTMLInputElement>)=>{
        setTodolistId(e.currentTarget.value)
    }
    const onChangeTitleHandler = (e:ChangeEvent<HTMLInputElement>)=>{
        setNewTitle(e.currentTarget.value)
    }
    const changeTodolistTitle = ()=>{
        todolistsAPI.updateTodolist(todolistId, newTitle)
            .then((res) => setState(res.data))
    }

    return (
        <div>
            <input placeholder={'Type todolist id'} onChange={onChangeTodolistIdHandler} value={todolistId}/>
            <input placeholder={'Type new todolist title'} onChange={onChangeTitleHandler} value={newTitle}/>
            <button onClick={changeTodolistTitle}>Change title for todolist</button>
            <div>{JSON.stringify(state)}</div>
        </div>
    )
}

