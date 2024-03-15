import React, {memo, useCallback, useEffect} from 'react';
import {Button} from './Button';
import {AddItemForm} from './AddItemForm/AddItemForm';
import {EditableSpan} from './EditableSpan/EditableSpan';
import {addNewTask, addTask, getTasks} from '../reducers/tasks-reducer';
import {
    changeTitleForTodolist,
    changeTodolistFilter,
    deleteTodolist, removeTodolist,
    TodolistDomainType, updateTodolist
} from '../reducers/todolists-reducer';
import {Task} from './Task/Task';
import {useAppDispatch, useAppSelector} from "../hooks/hooks";
import {TaskStatuses, TaskType} from "../api/tasks-api";


type TodolistProps = {
    todolist: TodolistDomainType
}

export const Todolist: React.FC<TodolistProps> = memo((props) => {
    const {todolist} = props;

    const dispatch = useAppDispatch()
    const tasks =
        useAppSelector<TaskType[]>(state => state.tasks[todolist.id])

    useEffect(() => {
        dispatch(getTasks(todolist.id))
    }, []);

    const tasksForTodolist = todolist.filter === 'active'
        ? tasks.filter(t => t.status === TaskStatuses.New)
        : todolist.filter === 'completed'
            ? tasks.filter(t => t.status === TaskStatuses.Completed)
            : tasks

    const tasksList: JSX.Element =
        <ul>
            {tasksForTodolist.map(t => <Task key={t.id} todolistId={todolist.id} taskId={t.id}/>)}
        </ul>


    const addTaskHandler = useCallback((title: string) => {
        dispatch(addTask(todolist.id, title))
    }, [dispatch, addTask, todolist.id])

    const removeTodolistHandler = useCallback(() => {
        dispatch(removeTodolist(todolist.id))
    }, [dispatch, removeTodolist, todolist.id])

    const onChangeTodolistTitleHandler = useCallback((title: string) => {
        dispatch(updateTodolist(todolist.id, title))
    }, [dispatch, updateTodolist, todolist.id])

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