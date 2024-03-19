import {TaskPriorities, TaskStatuses, TaskType} from "../api/tasks-api";

type ModelType = {
    [key: string]: string | TaskPriorities | TaskStatuses
}
export const updateTaskField = (task: TaskType, model: ModelType) => {
    return {
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        startDate: task.startDate,
        deadline: task.deadline,
        ...model
    }
}