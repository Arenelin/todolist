import React, {memo} from 'react';
import {EditableSpan} from '../../../../components/EditableSpan/EditableSpan';
import {Button} from '../../../../components/Button/Button';
import {useTask} from './taskHooks/useTask';
import {TaskStatuses} from '../../../../api/tasks-api';
import Skeleton from "@mui/material/Skeleton";

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
            {task.entityStatus === 'loading' ? (
                <Skeleton>
                    <input
                        type="checkbox"
                        checked={task.status === TaskStatuses.Completed}
                        onChange={onChangeStatusTaskHandler}
                    />
                    <EditableSpan title={task.title} onChangeTitle={onChangeTaskTitleHandler}/>
                    <Button name={'x'} callback={onRemoveHandler}/>
                </Skeleton>
            ) : (
                <div>
                    <input
                        type="checkbox"
                        checked={task.status === TaskStatuses.Completed}
                        onChange={onChangeStatusTaskHandler}
                    />
                    <EditableSpan title={task.title} onChangeTitle={onChangeTaskTitleHandler} />
                    <Button name={'x'} callback={onRemoveHandler} />
                </div>
            )}
        </div>
    );
});