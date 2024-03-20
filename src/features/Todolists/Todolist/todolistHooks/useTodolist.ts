import {useCallback} from 'react';
import {addTask, TaskDomainType} from '../../tasksReducer/tasks-reducer';
import {
    changeTodolistFilter,
    removeTodolist,
    TodolistDomainType,
    updateTodolistTitle,
} from '../../todolistsReducer/todolists-reducer';
import {TaskStatuses} from '../../../../api/tasks-api';
import {useAppDispatch, useAppSelector} from '../../../../hooks/hooks';

export const useTodolist = (todolist: TodolistDomainType) => {
    const dispatch = useAppDispatch();

    const tasks =
        useAppSelector<TaskDomainType[]>(state => state.tasks[todolist.id])

    let tasksForTodoList = todolist.filter === 'active'
        ? tasks.filter(t => t.status === TaskStatuses.New)
        : todolist.filter === 'completed'
            ? tasks.filter(t => t.status === TaskStatuses.Completed)
            : tasks;

    const addTaskForCurrentTodolist = useCallback((title: string) => {
        dispatch(addTask(todolist.id, title))
    }, [dispatch, addTask, todolist.id]);

    const onClickRemoveTodolist = useCallback(() => {
        dispatch(removeTodolist(todolist.id))
    }, [dispatch, removeTodolist, todolist.id])

    const onChangeTodolistTitle = useCallback((title: string) => {
        dispatch(updateTodolistTitle(todolist.id, title))
    }, [dispatch, updateTodolistTitle, todolist.id])

    const changeAllFilterHandler = useCallback(() => {
        dispatch(changeTodolistFilter(todolist.id, 'all'))
    }, [dispatch, todolist.id])

    const changeActiveFilterHandler = useCallback(() => {
        dispatch(changeTodolistFilter(todolist.id, 'active'))
    }, [dispatch, todolist.id])

    const changeCompletedFilterHandler = useCallback(() => {
        dispatch(changeTodolistFilter(todolist.id, 'completed'))
    }, [dispatch, todolist.id])

    return {
        tasksForTodoList,
        addTaskForCurrentTodolist,
        onClickRemoveTodolist,
        onChangeTodolistTitle,
        changeAllFilterHandler,
        changeActiveFilterHandler,
        changeCompletedFilterHandler
    }
}