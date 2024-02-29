import {v1} from 'uuid';
import {
    addTodolist, changeTodolistFilter, changeTodolistName,
    deleteTodolist, FilterValues, setTodolists, TodolistDomainType,
    todolistsReducer
} from './todolists-reducer';
import {TodolistType} from '../../../api/todolists-api';

let todolistId1 = v1()
let todolistId2 = v1()
let todolistId3 = v1()

let startState: TodolistDomainType[];
beforeEach(() => {
    startState = [
        {id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
        {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}
    ]
})

test('correct todolist should be removed', () => {
    const endState = todolistsReducer(startState, deleteTodolist(todolistId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be added', () => {
    const newTodolistTitle = 'New Todolist'
    const newTodolist: TodolistType = {
        id: todolistId3,
        title: newTodolistTitle,
        addedDate: '',
        order: 0
    }
    const endState = todolistsReducer(startState, addTodolist(newTodolist))

    expect(endState.length).toBe(3)
    expect(endState[0].id).toBeDefined()
    expect(endState[0].title).toBe(newTodolistTitle)
    expect(endState[0].filter).toBe('all')
})

test('correct todolist should change its name', () => {
    let newTodolistTitle = 'New Todolist'
    const endState = todolistsReducer(startState, changeTodolistName(todolistId2, newTodolistTitle))

    expect(endState.length).toBe(2)
    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodolistTitle)
})

test('correct filter of todolist should be changed', () => {
    let newFilter: FilterValues = 'completed'
    const endState = todolistsReducer(startState, changeTodolistFilter(todolistId2, newFilter))

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)
})
test('todolists should be set to the state', () => {
    const endState = todolistsReducer([], setTodolists(startState))

    expect(endState.length).toBe(2)
    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe('all')
})
