import {TaskPriorities, TaskStatuses, TaskType, UpdateTaskModel} from '../api/tasks-api';

export type NewValueType = {
    [key: string]: TaskStatuses | TaskPriorities | string
}

export const createTaskModel = (task: TaskType, objectChange: NewValueType): UpdateTaskModel => {
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