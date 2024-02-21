import {v1} from 'uuid';
import {
    addTodolist, changeTodolistFilter, changeTodolistName,
    deleteTodolist, FilterValues, TodolistDomainType,
    todolistsReducer
} from './todolists-reducer';

let todolistId1 = v1()
let todolistId2 = v1()

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
    let newTodolistTitle = 'New Todolist'
    const endState = todolistsReducer(startState, addTodolist(newTodolistTitle))

    expect(endState.length).toBe(3)
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
