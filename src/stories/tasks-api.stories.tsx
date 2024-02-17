import React, {ChangeEvent, useState} from 'react'
import {tasksAPI} from '../api/tasks-api';


export default {
    title: 'API-Tasks'
}


export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState('')
    const [title, setTitle] = useState('')

    const onChangeTodolistIdHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value)
    }
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const addNewTask = () => {
        tasksAPI.createTask(todolistId, title)
            .then((res) => setState(res.data))
        setTitle('')
        setTodolistId('')
    }

    return (
        <div>
            <input placeholder={'Type todolist id'} onChange={onChangeTodolistIdHandler} value={todolistId}/>
            <input placeholder={'Type task title'} onChange={onChangeTitleHandler} value={title}/>
            <button onClick={addNewTask}>Add new task</button>
            <div>{JSON.stringify(state)}</div>
        </div>
    )
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState('')

    const onChangeTodolistIdHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value)
    }
    const getTasks = () => {
        tasksAPI.getTasks(todolistId)
            .then((res) => setState(res.data))
        setTodolistId('')
    }

    return (
        <div>
            <input placeholder={'Type todolist id'} onChange={onChangeTodolistIdHandler} value={todolistId}/>
            <button onClick={getTasks}>Get all tasks</button>
            <div>{JSON.stringify(state)}</div>
        </div>
    )
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState('')
    const [taskId, setTaskId] = useState('')
    const onChangeTodolistIdHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value)
    }
    const onChangeTaskIdHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskId(e.currentTarget.value)
    }
    const deleteTask = () => {
        tasksAPI.deleteTask(todolistId, taskId)
            .then((res) => setState(res.data))
        setTaskId('')
        setTodolistId('')
    }

    return (
        <div>
            <input placeholder={'Type todolist id'} onChange={onChangeTodolistIdHandler} value={todolistId}/>
            <input placeholder={'Type task id'} onChange={onChangeTaskIdHandler} value={taskId}/>
            <button onClick={deleteTask}>Delete task</button>
            <div>{JSON.stringify(state)}</div>
        </div>
    )
}

export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState('')
    const [taskId, setTaskId] = useState('')
    const [newTitle, setNewTitle] = useState('')

    const model = {
        title: 'default',
        description: '',
        completed: false,
        status: 1,
        priority: 1,
        startDate: '2024-02-17T08:53:24.073',
        deadline: '2024-02-17T08:53:24.073'
    }

    const onChangeTodolistIdHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value)
    }
    const onChangeTaskIdHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskId(e.currentTarget.value)
    }

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    const changeTaskTitle = () => {
        tasksAPI.updateTask(todolistId, taskId, {...model, title: newTitle})
            .then((res) => setState(res.data))
        setNewTitle('')
        setTaskId('')
        setTodolistId('')
    }

    return (
        <div>
            <input placeholder={'Type todolist id'} onChange={onChangeTodolistIdHandler} value={todolistId}/>
            <input placeholder={'Type task id'} onChange={onChangeTaskIdHandler} value={taskId}/>
            <input placeholder={'Type new title for task'} onChange={onChangeTitleHandler} value={newTitle}/>
            <button onClick={changeTaskTitle}>Change task title</button>
            <div>{JSON.stringify(state)}</div>
        </div>
    )
}
