import {useDispatch, useSelector} from 'react-redux';
import {AppRootState} from '../../../state/store';
import {useCallback} from 'react';
import {addNewTask, TaskType} from '../../../state/reducers/tasks-reducer';
import {
    changeTodolistFilter,
    changeTodolistName,
    deleteTodolist,
    TodolistType
} from '../../../state/reducers/todolists-reducer';

export const useTodolist = (todolist: TodolistType) => {
    const dispatch = useDispatch();

    const tasks =
        useSelector<AppRootState, TaskType[]>(state => state.tasks[todolist.id])

    let tasksForTodoList = todolist.filter === 'active'
        ? tasks.filter(t => !t.isDone)
        : todolist.filter === 'completed'
            ? tasks.filter(t => t.isDone)
            : tasks;

    const addTaskForCurrentTodolist = useCallback((title: string) => {
        dispatch(addNewTask(todolist.id, title))
    }, [todolist.id]);

    const onClickRemoveTodolist = useCallback(() => {
        dispatch(deleteTodolist(todolist.id))
    }, [dispatch, todolist.id])

    const onChangeTodolistTitle = useCallback((title: string) => {
        dispatch(changeTodolistName(todolist.id, title))
    }, [dispatch, todolist.id])

    const changeAllFilterHandler = useCallback(() => {
        dispatch(changeTodolistFilter(todolist.id, 'all'))
    }, [todolist.id])

    const changeActiveFilterHandler = useCallback(() => {
        dispatch(changeTodolistFilter(todolist.id, 'active'))
    }, [todolist.id])

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