import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {Button} from './Button';
import {FilterValuesType} from './App';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListProps = {
    todolistId: string
    titleForTodolist: string
    tasks: TaskType[]
    filter: FilterValuesType
    removeTask: (todolistId: string, taskId: string) => void
    filteredTasks: (todolistId: string, filterValue: FilterValuesType) => void
    addTask: (todolistId: string, titleValue: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, newIsDoneValue: boolean) => void
    removeTodolist: (todolistId: string) => void
}
export const TodoList: React.FC<TodoListProps> = (props) => {
    const {
        todolistId,
        titleForTodolist,
        tasks,
        filter,
        removeTask,
        filteredTasks,
        addTask,
        changeTaskStatus,
        removeTodolist
    } = props;
    const [title, setTitle] = useState('');
    const [error, setError] = useState(false);

    //Фильтрация отображения тасок, в зависимости от значения фильтра
    const tasksForTodolist: TaskType[] = filter === 'active'
        ? tasks.filter(t => !t.isDone)
        : filter === 'completed'
            ? tasks.filter(t => t.isDone)
            : tasks;

    const listItems: JSX.Element = tasksForTodolist.length
        ? <ul>
            {tasksForTodolist.map(t => {
                const onClickRemoveTaskHandler = () => removeTask(todolistId, t.id);

                //Попытка изменения значения currentValue на противоположное приводит к вызову функции-обработчика
                const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => changeTaskStatus(todolistId, t.id, e.currentTarget.checked);
                return (
                    <li key={t.id} className={t.isDone ? 'task-is-done' : ''}>
                        <input type="checkbox" checked={t.isDone} onChange={onChangeTaskStatusHandler}/>
                        <span>{t.title}</span>
                        <Button title={'x'} callback={onClickRemoveTaskHandler}/>
                    </li>
                )
            })}
        </ul>
        : <p>Tasks list is empty</p>

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
        error && setError(false);
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && title) {
            onClickAddTaskHandler()
        }
    }
    const onClickAddTaskHandler = () => {
        if (title.trim()) {
            addTask(todolistId, title.trim());
        } else {
            setError(true);
        }
        setTitle('');

    }
    const onClickFilterTasksHandler = (filterValue: FilterValuesType) => {
        filteredTasks(todolistId, filterValue);
    }

    const removeTodolistHandler = () => {
        removeTodolist(todolistId);
    }

    return (
        <div className="todoList">
            <h3>{titleForTodolist} <Button title={'x'} callback={removeTodolistHandler}/></h3>
            <div>
                <input
                    value={title}
                    onChange={onChangeTitleHandler}
                    onKeyDown={onKeyDownHandler}
                    className={error ? 'error-input' : ''}
                />
                <Button title={'+'} callback={onClickAddTaskHandler} isDisabled={!title}/>
            </div>
            {error && <div className="error">Error: title is required</div>}
            {listItems}
            <div>
                <Button
                    className={filter === 'all' ? 'btn-active' : ''}
                    title={'All'}
                    callback={() => onClickFilterTasksHandler('all')}
                />
                <Button
                    className={filter === 'active' ? 'btn-active' : ''}
                    title={'Active'}
                    callback={() => onClickFilterTasksHandler('active')}
                />
                <Button
                    className={filter === 'completed' ? 'btn-active' : ''}
                    title={'Completed'}
                    callback={() => onClickFilterTasksHandler('completed')}
                />
            </div>
        </div>
    )
}