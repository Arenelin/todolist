import {TaskObjType, todolistType} from '../components/App/App';
import {addTodolist, deleteTodolist, todolistsReducer} from './todolist-reducer';
import {tasksReducer} from './tasks-reducer';

test('ids should be equals', () => {
    const startTasksState: TaskObjType = {}
    const startTodolistsState: todolistType[] = []

    const action = addTodolist('new todolist')

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.payload.todolistId)
    expect(idFromTodolists).toBe(action.payload.todolistId)
})

test('property with todolistId should be deleted', () => {
    const startState: TaskObjType = {
        'todolistId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false}
        ]
    }

    const endState = tasksReducer(startState, deleteTodolist('todolistId2'))

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
})