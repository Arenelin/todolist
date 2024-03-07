import {TaskPriorities, TaskStatuses, UpdateTaskModel} from '../api/tasks-api';
import {TaskDomainType} from '../features/Todolists/tasksReducer/tasks-reducer';

export type NewValueType = {
    [key: string]: TaskStatuses | TaskPriorities | string
}

export const createTaskModel = (task: TaskDomainType, objectChange: NewValueType): UpdateTaskModel => {
    return {
        title: task.title,
        status: task.status,
        deadline: task.deadline,
        description: task.description,
        startDate: task.startDate,
        priority: task.priority,
        ...objectChange
    }
}