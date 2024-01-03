import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {Button} from './Button';
import {FilterValuesType} from './App';

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
    filteredTasks: (todolistId: string, valueFilter: FilterValuesType) => void
    addTask: (todolistId: string, titleValue: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, newIsDoneValue: boolean) => void
    removeTodolist: (todolistId: string) => void
}

export const Todolist: React.FC<TodolistProps> = (props) => {
    const {
        todolistId,
        title,
        tasks,
        filter,
        removeTask,
        filteredTasks,
        addTask,
        changeTaskStatus,
        removeTodolist
    } = props;
    const [taskTitle, setTaskTitle] = useState('');
    const [inputError, setInputError] = useState(false);

    const tasksForTodolist = filter === 'active'
        ? tasks.filter(t => !t.isDone)
        : filter === 'completed'
            ? tasks.filter(t => t.isDone)
            : tasks

    const tasksList: JSX.Element = tasksForTodolist.length
        ? <ul>
            {tasksForTodolist.map(t => {
                const onClickRemoveTaskHandler = () => removeTask(todolistId, t.id);
                const onChangeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => changeTaskStatus(todolistId, t.id, e.currentTarget.checked);
                return (<li key={t.id} className={t.isDone ? 'task-is-done' : 'task'}>
                    <input
                        type="checkbox"
                        checked={t.isDone}
                        onChange={onChangeTaskStatus}/>
                    <span>{t.title}</span>
                    <Button callback={onClickRemoveTaskHandler} title={'x'}/>
                </li>)
            })}
        </ul>
        : <p>Tasks list is empty</p>

    const addTaskOnKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && taskTitle) {
            addTaskHandler();
        }
    }

    const addTaskHandler = () => {
        if (taskTitle.trim()) {
            addTask(todolistId, taskTitle.trim());

        } else {
            setInputError(true);
        }
        setTaskTitle('');
    };

    const onChangeTaskTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value)
        inputError && setInputError(false);
    }

    const removeTodolistHandler = () => {
        removeTodolist(todolistId);
    }

    return (
        <div className="todoList">
            <h3>{title} <Button title={'x'} callback={removeTodolistHandler}/></h3>
            <div>
                <input value={taskTitle}
                       onChange={onChangeTaskTitle}
                       onKeyDown={addTaskOnKeyDownHandler}
                       className={inputError ? 'input-error' : ''}
                />

                <Button callback={addTaskHandler} title={'+'} isDisabled={!taskTitle}/>
            </div>
            {inputError && <div className={'error'}>Error: title is required</div>}
            {tasksList}
            <div>
                <Button className={filter === 'all' ? 'btn-active' : ''}
                        callback={() => filteredTasks(todolistId, 'all')}
                        title={'All'}
                />
                <Button className={filter === 'active' ? 'btn-active' : ''}
                        callback={() => filteredTasks(todolistId, 'active')}
                        title={'Active'}
                />
                <Button className={filter === 'completed' ? 'btn-active' : ''}
                        callback={() => filteredTasks(todolistId, 'completed')}
                        title={'Completed'}
                />
            </div>
        </div>
    )
}
