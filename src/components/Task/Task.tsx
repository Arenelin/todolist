import React, {memo} from 'react';
import {EditableSpan} from '../EditableSpan/EditableSpan';
import {Button} from '../Button/Button';
import {useTask} from './hooks/useTask';
import {TaskStatuses} from '../../api/tasks-api';

type TaskProps = {
    todolistId: string
    taskId: string
}

export const Task: React.FC<TaskProps> = memo((props) => {
    const {todolistId, taskId} = props;
    const {
        task,
        onRemoveHandler,
        onChangeTaskTitleHandler,
        onChangeStatusTaskHandler
    } = useTask(todolistId, taskId)

    return (
        <div>
            <input type="checkbox" checked={task.status === TaskStatuses.Completed} onChange={onChangeStatusTaskHandler}/>
            <EditableSpan title={task.title} onChangeTitle={onChangeTaskTitleHandler}/>
            <Button name={'x'} callback={onRemoveHandler}/>
        </div>
    );
});