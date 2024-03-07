import {ChangeEvent, useCallback} from 'react';
import {removeTask, TaskDomainType, updateTask} from '../../../tasksReducer/tasks-reducer';
import {TaskStatuses} from '../../../../../api/tasks-api';
import {useAppDispatch, useAppSelector} from '../../../../../hooks/hooks';

export const useTask = (todolistId: string, taskId: string) => {

    const dispatch = useAppDispatch()
    const task = useAppSelector<TaskDomainType>(state =>
        state.tasks[todolistId].filter(t => t.id === taskId)[0])

    const onRemoveHandler = useCallback(() => {
        dispatch(removeTask(todolistId, taskId))
    }, [dispatch, removeTask, todolistId, taskId])

    const onChangeTaskTitleHandler = useCallback((title: string) => {
        dispatch(updateTask(todolistId, taskId, {title}))
    }, [dispatch, updateTask, todolistId, taskId])

    const onChangeStatusTaskHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(updateTask(todolistId, taskId, {
            status: e.currentTarget.checked
                ? TaskStatuses.Completed
                : TaskStatuses.New
        }))
    }

    return {
        task,
        onRemoveHandler,
        onChangeTaskTitleHandler,
        onChangeStatusTaskHandler
    }
}