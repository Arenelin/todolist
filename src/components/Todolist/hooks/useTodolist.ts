import {useDispatch, useSelector} from 'react-redux';
import {AppRootState} from '../../../state/store';
import {useCallback} from 'react';
import {addNewTask} from '../../../state/reducers/tasks-reducer';
import {
    changeTodolistFilter,
    changeTodolistName,
    deleteTodolist,
    TodolistDomainType,
} from '../../../state/reducers/todolists-reducer';
import {TaskStatuses, TaskType} from '../../../api/tasks-api';

export const useTodolist = (todolist: TodolistDomainType) => {
    const dispatch = useDispatch();

    const tasks =
        useSelector<AppRootState, TaskType[]>(state => state.tasks[todolist.id])

    let tasksForTodoList = todolist.filter === 'active'
        ? tasks.filter(t => t.status === TaskStatuses.New)
        : todolist.filter === 'completed'
            ? tasks.filter(t => t.status === TaskStatuses.Completed)
            : tasks;

    const addTaskForCurrentTodolist = useCallback((title: string) => {
        dispatch(addNewTask(todolist.id, title))
    }, [dispatch, todolist.id]);

    const onClickRemoveTodolist = useCallback(() => {
        dispatch(deleteTodolist(todolist.id))
    }, [dispatch, todolist.id])

    const onChangeTodolistTitle = useCallback((title: string) => {
        dispatch(changeTodolistName(todolist.id, title))
    }, [dispatch, todolist.id])

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