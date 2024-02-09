import React, {ChangeEvent, memo, useCallback} from 'react';
import {EditableSpan} from '../EditableSpan/EditableSpan';
import {Button} from '../../Button';
import {changeTaskStatus, changeTitleForTask, deleteTask} from '../../state/reducers/tasks-reducer';
import {TaskType} from '../Todolist/TodoList';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootState} from '../../state/store';

type TaskProps = {
    todolistId: string
    taskId:string
}

export const Task: React.FC<TaskProps> = memo((props) => {
    const {todolistId, taskId} = props;

    const dispatch = useDispatch()
    const task = useSelector<AppRootState, TaskType>(state =>
        state.tasks[todolistId].filter(t => t.id === taskId)[0])

    const onRemoveHandler = useCallback(() => {
        dispatch(deleteTask(todolistId, taskId))
    }, [dispatch, todolistId, taskId])

    const onChangeTaskTitleHandler = useCallback((title: string) => {
        dispatch(changeTitleForTask(todolistId, taskId, title))
    }, [dispatch, todolistId, taskId])

    const onChangeStatusTaskHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatus(todolistId, taskId, e.currentTarget.checked))
    }

    return (
        <div>
            <input type="checkbox" checked={task.isDone} onChange={onChangeStatusTaskHandler}/>
            <EditableSpan title={task.title} onChangeTitle={onChangeTaskTitleHandler}/>
            <Button name={'x'} callback={onRemoveHandler}/>
        </div>
    );
});