import {v1} from 'uuid';
import {TasksState} from '../App';
import {addTask, changeTaskStatus, changeTaskTitle, removeTask, tasksReducer} from './tasks-reducer';
import {addTodolistAC, removeTodolistAC} from './todolists-reducer';


test('correct task should be removed', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: TasksState = {
        [todolistId1]: [
            {id: '1', title: 'CSS', isDone: true},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false},
            {id: '4', title: 'Redux', isDone: false},
        ],
        [todolistId2]: [
            {id: '1', title: 'Book', isDone: false},
            {id: '2', title: 'Milk', isDone: true},
        ],
    }

    const endState = tasksReducer(startState, removeTask(todolistId1, '2'))
    expect(endState[todolistId2].length).toBe(2)

    expect(endState[todolistId1].length).toBe(3);
    expect(endState[todolistId1][2].title).toBe('Redux');
    expect(endState[todolistId1].every(t => t.id !== '2')).toBeTruthy()


})
test('correct task should be added', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: TasksState = {
        [todolistId1]: [
            {id: '1', title: 'CSS', isDone: true},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false},
            {id: '4', title: 'Redux', isDone: false},
        ],
        [todolistId2]: [
            {id: '1', title: 'Book', isDone: false},
            {id: '2', title: 'Milk', isDone: true},
        ],
    }
    const newTaskTitleForTech = 'Redux Toolkit';
    const newTaskTitleForProducts = 'Meat';

    const endState = tasksReducer(startState, addTask(todolistId1, newTaskTitleForTech))

    const endState2 = tasksReducer(startState, addTask(todolistId2, newTaskTitleForProducts))

    expect(startState[todolistId1].length).toBe(4);

    expect(endState[todolistId1].length).toBe(5);
    expect(endState[todolistId1][4].id).toBeDefined()
    expect(endState[todolistId1][4].title).toBe(newTaskTitleForTech);
    expect(endState[todolistId1][4].isDone).toBe(false);


    expect(endState2[todolistId2].length).toBe(3);
    expect(endState[todolistId1][2].id).toBeDefined()
    expect(endState2[todolistId2][2].title).toBe(newTaskTitleForProducts);
    expect(endState2[todolistId2][2].isDone).toBe(false);
})
test('status of specified task should be changed', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: TasksState = {
        [todolistId1]: [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false},
            {id: '4', title: 'Redux', isDone: false},
        ],
        [todolistId2]: [
            {id: '1', title: 'Book', isDone: false},
            {id: '2', title: 'Milk', isDone: true},
        ],
    }
    const newValue = true;

    const endState = tasksReducer(startState, changeTaskStatus(todolistId2, '1', newValue));

    expect(endState[todolistId2].length).toBe(2);
    expect(endState[todolistId2][0].isDone).toBe(newValue); //true
    expect(endState[todolistId2][0].title).toBe('Book');
    expect(endState[todolistId1][0].isDone).toBeFalsy()

    expect(startState[todolistId2][0].isDone).toBe(false);
})
test('title of specified task should be changed', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: TasksState = {
        [todolistId1]: [
            {id: '1', title: 'CSS', isDone: true},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false},
            {id: '4', title: 'Redux', isDone: false},
        ],
        [todolistId2]: [
            {id: '1', title: 'Book', isDone: false},
            {id: '2', title: 'Milk', isDone: true},
        ],
    }
    const newTitle = 'HTML'

    const endState = tasksReducer(startState, changeTaskTitle(todolistId1, '1', newTitle));

    expect(startState[todolistId1][0].title).toBe('CSS');

    expect(endState[todolistId1].length).toBe(4);
    expect(endState[todolistId1][0].isDone).toBeTruthy();
    expect(endState[todolistId1][0].title).toBe(newTitle);
    expect(endState[todolistId2][0].title).toBe('Book')
})
test('new property with new array should be added when new todolist is added', () => {

    const startState: TasksState = {
        ['todolistId1']: [
            {id: '1', title: 'CSS', isDone: true},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false},
            {id: '4', title: 'Redux', isDone: false},
        ],
        ['todolistId2']: [
            {id: '1', title: 'Book', isDone: false},
            {id: '2', title: 'Milk', isDone: true},
        ],
    }

    const newTodolistTitle = 'no matter'

    const endState = tasksReducer(startState, addTodolistAC(newTodolistTitle))

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})
test('property with todolistId should be deleted', () => {
    const startState: TasksState = {
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

    const action = removeTodolistAC('todolistId2')

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).toBeUndefined()
})
