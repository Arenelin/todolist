import React, {ChangeEvent, useState} from 'react'
import {tasksAPI, UpdateTaskModel} from '../api/tasks-api';


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

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState('')
    const [taskId, setTaskId] = useState('')

    const [modelTask, setModelTask] = useState<UpdateTaskModel>(
        {
            title: 'title 1',
            description: 'description 1',
            status: 0,
            priority: 0,
            startDate: '2024-02-17T08:53:24.073',
            deadline: '2024-02-17T08:53:24.073'
        }
    )

    const onChangeTodolistIdHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value)
    }
    const onChangeTaskIdHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskId(e.currentTarget.value)
    }
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setModelTask({...modelTask, title: e.currentTarget.value})
    }
    const onChangeDescriptionHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setModelTask({...modelTask, description: e.currentTarget.value})
    }
    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setModelTask({...modelTask, status: +e.currentTarget.value})
    }
    const onChangePriorityHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setModelTask({...modelTask, priority: +e.currentTarget.value})
    }
    const onChangeStartDateHandler = () => {
        const currentDate = new Date()
        setModelTask({...modelTask, startDate: currentDate.toISOString()})
    }
    const onChangeDeadlineHandler = () => {
        const deadline = new Date(Date.UTC(2024, 1, 19, 10, 47, 30))
        setModelTask({...modelTask, deadline: deadline.toISOString()})
    }
    const saveNewData = () => {
        tasksAPI.updateTask(todolistId, taskId, modelTask)
            .then((res) => setState(res.data))
        setTaskId('')
        setTodolistId('')
    }

    return (
        <div>
            <input placeholder={'Type todolist id'} onChange={onChangeTodolistIdHandler} value={todolistId}/>
            <input placeholder={'Type task id'} onChange={onChangeTaskIdHandler} value={taskId}/>
            <input placeholder={'Type new title for task'} onChange={onChangeTitleHandler} value={modelTask.title}/>
            <input placeholder={'Type new description for task'} onChange={onChangeDescriptionHandler} value={modelTask.description}/>
            <input type={'number'} onChange={onChangeStatusHandler} value={modelTask.status}/>
            <input type={'number'} onChange={onChangePriorityHandler} value={modelTask.priority}/>
            <button onClick={onChangeStartDateHandler}>Set current date for task</button>
            <button onClick={onChangeDeadlineHandler}>Set tomorrow as the deadline for a task</button>
            <button onClick={saveNewData}>Save changes</button>
            <div>{JSON.stringify(state)}</div>
        </div>
    )
}
