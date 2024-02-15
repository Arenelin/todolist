import React, {memo, useCallback} from 'react';
import {Button} from './Button';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {addNewTask} from '../reducers/tasks-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootState} from '../store/store';
import {changeTitleForTodolist, changeTodolistFilter, deleteTodolist} from '../reducers/todolists-reducer';
import {todolistType} from '../App';
import {Task} from './Task';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistProps = {
    todolist: todolistType
}

export const Todolist: React.FC<TodolistProps> = memo((props) => {
    const {todolist} = props;

    const dispatch = useDispatch()
    const tasks =
        useSelector<AppRootState, TaskType[]>(state => state.tasks[todolist.id])

    const tasksForTodolist = todolist.filter === 'active'
        ? tasks.filter(t => !t.isDone)
        : todolist.filter === 'completed'
            ? tasks.filter(t => t.isDone)
            : tasks

    const tasksList: JSX.Element = tasksForTodolist.length
        ? <ul>
            {tasksForTodolist.map(t => <Task key={t.id} todolistId={todolist.id} taskId={t.id}/>)}
        </ul>
        : <p>Tasks list is empty</p>

    const addTaskHandler = useCallback((title: string) => {
        dispatch(addNewTask(todolist.id, title))
    }, [dispatch, addNewTask, todolist.id])

    const removeTodolistHandler = useCallback(() => {
        dispatch(deleteTodolist(todolist.id))
    }, [dispatch, deleteTodolist, todolist.id])

    const onChangeTodolistTitleHandler = useCallback((title: string) => {
        dispatch(changeTitleForTodolist(todolist.id, title))
    }, [dispatch, changeTitleForTodolist, todolist.id])

    const changeAllFilter = useCallback(() => {
        dispatch(changeTodolistFilter(todolist.id, 'all'))
    }, [dispatch, changeTodolistFilter, todolist.id])

    const changeActiveFilter = useCallback(() => {
        dispatch(changeTodolistFilter(todolist.id, 'active'))
    }, [dispatch, changeTodolistFilter, todolist.id])

    const changeCompletedFilter = useCallback(() => {
        dispatch(changeTodolistFilter(todolist.id, 'completed'))
    }, [dispatch, changeTodolistFilter, todolist.id])

    return (
        <div className="todoList">
            <h3>
                <EditableSpan oldTitle={todolist.title} callback={onChangeTodolistTitleHandler}/>
                <Button title={'x'} callback={removeTodolistHandler}/>
            </h3>
            <AddItemForm callback={addTaskHandler}/>
            {tasksList}
            <div>
                <Button className={todolist.filter === 'all' ? 'btn-active' : ''}
                        callback={changeAllFilter}
                        title={'All'}/>
                <Button className={todolist.filter === 'active' ? 'btn-active' : ''}
                        callback={changeActiveFilter}
                        title={'Active'}/>
                <Button className={todolist.filter === 'completed' ? 'btn-active' : ''}
                        callback={changeCompletedFilter}
                        title={'Completed'}/>
            </div>
        </div>
    )
})