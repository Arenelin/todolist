import React, {ChangeEvent} from 'react';
import {Button} from './Button';
import {FilterValuesType} from '../App';
import {EditableSpan} from './EditableSpan';
import {AddItemForm} from './AddItemForm';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootType} from '../store/store';
import {addNewTask, changeStatusForTask, changeTitleForTask, deleteTask} from '../reducers/tasks-reducer';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListProps = {
    todolistId: string
    titleForTodolist: string
    filter: FilterValuesType
    filteredTasks: (todolistId: string, filterValue: FilterValuesType) => void
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
}
export const TodoList: React.FC<TodoListProps> = (props) => {
    const {
        todolistId,
        titleForTodolist,
        filter,
        filteredTasks,
        removeTodolist,
        changeTodolistTitle
    } = props;

    const dispatch = useDispatch();
    const tasks =
        useSelector<AppRootType, TaskType[]>(state => state.tasks[todolistId])

    //Фильтрация отображения тасок, в зависимости от значения фильтра
    const tasksForTodolist: TaskType[] = filter === 'active'
        ? tasks.filter(t => !t.isDone)
        : filter === 'completed'
            ? tasks.filter(t => t.isDone)
            : tasks;

    const listItems: JSX.Element = tasksForTodolist.length
        ? <ul>
            {tasksForTodolist.map(t => {
                const onClickRemoveTaskHandler = () => dispatch(deleteTask(todolistId, t.id));

                //Попытка изменения значения currentValue на противоположное приводит к вызову функции-обработчика
                const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    dispatch(changeStatusForTask(todolistId, t.id, e.currentTarget.checked))
                }

                const onChangeTaskTitleHandler = (title: string) => {
                    dispatch(changeTitleForTask(todolistId, t.id, title))
                }

                return (
                    <li key={t.id} className={t.isDone ? 'task-is-done' : ''}>
                        <input type="checkbox" checked={t.isDone} onChange={onChangeTaskStatusHandler}/>
                        <EditableSpan oldTitle={t.title} callback={onChangeTaskTitleHandler}/>
                        <Button title={'x'} callback={onClickRemoveTaskHandler}/>
                    </li>
                )
            })}
        </ul>
        : <p>Tasks list is empty</p>


    const onClickFilterTasksHandler = (filterValue: FilterValuesType) => {
        filteredTasks(todolistId, filterValue);
    }

    const removeTodolistHandler = () => {
        removeTodolist(todolistId);
    }

    const addTaskHandler = (title: string) => {
        dispatch(addNewTask(todolistId, title))
    }

    const onChangeTodolistTitleHandler = (title: string) => {
        changeTodolistTitle(todolistId, title)
    }

    return (
        <div className="todoList">
            <h3>
                <EditableSpan oldTitle={titleForTodolist} callback={onChangeTodolistTitleHandler}/>
                <Button title={'x'}
                        callback={removeTodolistHandler}/>
            </h3>
            <AddItemForm callback={addTaskHandler}/>
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