import {changeStatusTask, changeTitle, deleteTask} from '../reducers/tasks-reducer';
import {UniversalCheckbox} from './UniversalCheckbox';
import {EditableSpan} from './EditableSpan';
import {Button} from './Button';
import React, {memo, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootState} from '../store/store';
import {TaskType} from './Todolist';

type TaskProps = {
    todolistId: string
    taskId: string
}

export const Task: React.FC<TaskProps> = memo((props) => {
    const {todolistId, taskId} = props;

    const dispatch = useDispatch();
    const task =
        useSelector<AppRootState, TaskType>(state => state.tasks[todolistId]
            .filter(t => t.id === taskId)[0])

    const onClickRemoveTaskHandler = useCallback(() => {
        dispatch(deleteTask(todolistId, taskId))
    }, [dispatch, deleteTask, todolistId, taskId]);

    const onChangeTaskTitle = useCallback((title: string) => {
        dispatch(changeTitle(todolistId, taskId, title))
    }, [dispatch, changeTitle, todolistId, taskId])

    const onChangeTaskStatusHandler = useCallback((newValue: boolean) => {
        dispatch(changeStatusTask(todolistId, taskId, newValue))
    }, [dispatch, changeStatusTask, todolistId, taskId])

    return (
        <li className={task.isDone ? 'task-is-done' : 'task'}>
            <UniversalCheckbox checked={task.isDone} onChange={onChangeTaskStatusHandler}/>
            <EditableSpan oldTitle={task.title} callback={onChangeTaskTitle}/>
            <Button callback={onClickRemoveTaskHandler} title={'x'}/>
        </li>
    )
})