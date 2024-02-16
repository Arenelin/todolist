import {useDispatch, useSelector} from 'react-redux';
import {AppRootState} from '../../../state/store';
import {ChangeEvent, useCallback} from 'react';
import {changeTaskStatus, changeTitleForTask, deleteTask, TaskType} from '../../../state/reducers/tasks-reducer';

export const useTask = (todolistId: string, taskId: string) => {

    const dispatch = useDispatch()
    const task = useSelector<AppRootState, TaskType>(state =>
        state.tasks[todolistId].filter(t => t.id === taskId)[0])
    debugger

    const onRemoveHandler = useCallback(() => {
        dispatch(deleteTask(todolistId, taskId))
    }, [dispatch, todolistId, taskId])

    const onChangeTaskTitleHandler = useCallback((title: string) => {
        dispatch(changeTitleForTask(todolistId, taskId, title))
    }, [dispatch, todolistId, taskId])

    const onChangeStatusTaskHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatus(todolistId, taskId, e.currentTarget.checked))
    }

    return {
        task,
        onRemoveHandler,
        onChangeTaskTitleHandler,
        onChangeStatusTaskHandler
    }
}