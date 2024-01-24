import React, {ChangeEvent} from 'react';
import {Button} from './Button';
// import Button from '@mui/material/Button';
import {FilterValuesType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {UniversalCheckbox} from './components/UniversalCheckbox';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistProps = {
    todolistId: string
    title: string
    tasks: TaskType[]
    filter: FilterValuesType
    removeTask: (todolistId: string, taskId: string) => void
    changeFilterTodolistForFilteredTasks: (todolistId: string, valueFilter: FilterValuesType) => void
    addTask: (todolistId: string, titleValue: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, newIsDoneValue: boolean) => void
    removeTodolist: (todolistId: string) => void
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
}

export const Todolist: React.FC<TodolistProps> = (props) => {
    const {
        todolistId,
        title,
        tasks,
        filter,
        removeTask,
        changeFilterTodolistForFilteredTasks,
        addTask,
        changeTaskStatus,
        removeTodolist,
        changeTaskTitle,
        changeTodolistTitle
    } = props;


    const tasksForTodolist = filter === 'active'
        ? tasks.filter(t => !t.isDone)
        : filter === 'completed'
            ? tasks.filter(t => t.isDone)
            : tasks

    const onChangeTaskStatus = (taskId: string, newValue: boolean) => {
        changeTaskStatus(todolistId, taskId, newValue);
    }

    const tasksList: JSX.Element = tasksForTodolist.length
        ? <ul>
            {tasksForTodolist.map(t => {
                const onClickRemoveTaskHandler = () => removeTask(todolistId, t.id);


                const onChangeTaskTitle = (title: string) => {
                    changeTaskTitle(todolistId, t.id, title);
                }
                const onChangeTaskStatusHandler = (newValue: boolean) => {
                    onChangeTaskStatus(t.id, newValue)
                }
                return (<li key={t.id} className={t.isDone ? 'task-is-done' : 'task'}>
                    <UniversalCheckbox checked={t.isDone} onChange={onChangeTaskStatusHandler}/>
                    <EditableSpan oldTitle={t.title} callback={onChangeTaskTitle}/>
                    <Button callback={onClickRemoveTaskHandler} title={'x'}/>
                </li>)
            })}
        </ul>
        : <p>Tasks list is empty</p>

    const addTaskHandler = (title: string) => {
        addTask(todolistId, title);
    }

    const removeTodolistHandler = () => {
        removeTodolist(todolistId);
    }

    const onChangeTodolistTitleHandler = (title: string) => {
        changeTodolistTitle(todolistId, title);
    }

    return (
        <div className="todoList">
            <h3>
                <EditableSpan oldTitle={title} callback={onChangeTodolistTitleHandler}/>
                {/*<Button onClick={removeTodolistHandler} variant="contained">x</Button>*/}
                <Button title={'x'} callback={removeTodolistHandler}/>
            </h3>
            <AddItemForm callback={addTaskHandler}/>
            {tasksList}
            <div>
                <Button className={filter === 'all' ? 'btn-active' : ''}
                        callback={() => changeFilterTodolistForFilteredTasks(todolistId, 'all')}
                        title={'All'}
                />
                <Button className={filter === 'active' ? 'btn-active' : ''}
                        callback={() => changeFilterTodolistForFilteredTasks(todolistId, 'active')}
                        title={'Active'}
                />
                <Button className={filter === 'completed' ? 'btn-active' : ''}
                        callback={() => changeFilterTodolistForFilteredTasks(todolistId, 'completed')}
                        title={'Completed'}
                />
            </div>
        </div>
    )
}
