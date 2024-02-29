import {addTodolist, TodolistDomainType, todolistsReducer} from './todolists-reducer';
import {tasksReducer, TasksState} from '../tasksReducer/tasks-reducer';
import {TodolistType} from '../../../api/todolists-api';

test('ids should be equals', () => {
    const startTasksState: TasksState = {}
    const startTodolistsState: TodolistDomainType[] = []
    const newTodolistTitle = 'New Todolist'
    const newTodolist: TodolistType = {
        id: 'some-id',
        title: newTodolistTitle,
        addedDate: '',
        order: 0
    }

    const action = addTodolist(newTodolist)

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.payload.todolist.id)
    expect(idFromTodolists).toBe(action.payload.todolist.id)
})
