import {removeTask, TaskDomainType, updateTask} from '../../reducers/tasks-reducer';
import {UniversalCheckbox} from '../UniversalCheckbox';
import {EditableSpan} from '../EditableSpan/EditableSpan';
import {Button} from '../Button';
import React, {memo, useCallback} from 'react';
import {useSelector} from 'react-redux';
import {AppRootState} from '../../store/store';
import {useAppDispatch} from "../../hooks/hooks";
import {TaskStatuses} from "../../api/tasks-api";
import Skeleton from '@mui/material/Skeleton';

type TaskProps = {
    todolistId: string
    taskId: string
}

export const Task: React.FC<TaskProps> = memo((props) => {
    const {todolistId, taskId} = props;

    const dispatch = useAppDispatch();
    const task =
        useSelector<AppRootState, TaskDomainType>(state => state.tasks[todolistId]
            .filter(t => t.id === taskId)[0])

    const onClickRemoveTaskHandler = useCallback(() => {
        dispatch(removeTask(todolistId, taskId))
    }, [dispatch, removeTask, todolistId, taskId]);

    const onChangeTaskTitle = useCallback((title: string) => {
        dispatch(updateTask(todolistId, taskId, {title}))
    }, [dispatch, updateTask, todolistId, taskId])

    const onChangeTaskStatusHandler = useCallback((newValue: boolean) => {
        dispatch(updateTask(todolistId, taskId, {status: newValue ? TaskStatuses.Completed : TaskStatuses.New}))
    }, [dispatch, updateTask, todolistId, taskId])

    return (
        <>
            {task.entityStatus === 'loading'
                ? <Skeleton animation="wave">
                    <li className={task.status === TaskStatuses.Completed ? 'task-is-done' : 'task'}>
                        <UniversalCheckbox checked={task.status === TaskStatuses.Completed}
                                           onChange={onChangeTaskStatusHandler}/>
                        <EditableSpan oldTitle={task.title} callback={onChangeTaskTitle}/>
                        <Button callback={onClickRemoveTaskHandler} title={'x'}/>
                    </li>
                </Skeleton>
                : <li className={task.status === TaskStatuses.Completed ? 'task-is-done' : 'task'}>
                    <UniversalCheckbox checked={task.status === TaskStatuses.Completed}
                                       onChange={onChangeTaskStatusHandler}/>
                    <EditableSpan oldTitle={task.title} callback={onChangeTaskTitle}/>
                    <Button callback={onClickRemoveTaskHandler} title={'x'}/>
                </li>}
        </>

    )
})