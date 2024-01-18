import {v1} from 'uuid';
import {TasksState} from '../App';
import {addTask, changeTaskStatus, changeTaskTitle, removeTask, tasksReducer} from './tasks-reducer';


test('correct task should be removed', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: TasksState = {
        [todolistId1]: [
            {id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'Redux', isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: 'Book', isDone: false},
            {id: v1(), title: 'Milk', isDone: true},
        ],
    }

    const endState = tasksReducer(startState, removeTask(todolistId1, startState[todolistId1][2].id))

    expect(endState[todolistId1].length).toBe(3);
    expect(endState[todolistId1][2].title).toBe('Redux');
})
test('correct task should be added', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: TasksState = {
        [todolistId1]: [
            {id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'Redux', isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: 'Book', isDone: false},
            {id: v1(), title: 'Milk', isDone: true},
        ],
    }
    const newTaskTitleForTech = 'Redux Toolkit';
    const newTaskTitleForProducts = 'Meat';

    const endState = tasksReducer(startState, addTask(todolistId1, newTaskTitleForTech))

    const endState2 = tasksReducer(startState, addTask(todolistId2, newTaskTitleForProducts))

    expect(startState[todolistId1].length).toBe(4);

    expect(endState[todolistId1].length).toBe(5);
    expect(endState[todolistId1][4].title).toBe(newTaskTitleForTech);
    expect(endState[todolistId1][4].isDone).toBe(false);

    expect(endState2[todolistId2].length).toBe(3);
    expect(endState2[todolistId2][2].title).toBe(newTaskTitleForProducts);
    expect(endState2[todolistId2][2].isDone).toBe(false);
})
test('correct task should be status changed', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: TasksState = {
        [todolistId1]: [
            {id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'Redux', isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: 'Book', isDone: false},
            {id: v1(), title: 'Milk', isDone: true},
        ],
    }
    const newValue = true;

    const endState = tasksReducer(startState, changeTaskStatus(todolistId1, startState[todolistId1][3].id, newValue));

    expect(endState[todolistId1].length).toBe(4);
    expect(endState[todolistId1][3].isDone).toBe(newValue);
    expect(endState[todolistId1][3].title).toBe('Redux');

    expect(startState[todolistId1][3].isDone).toBe(false);
})
test('correct task should be title changed', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: TasksState = {
        [todolistId1]: [
            {id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'Redux', isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: 'Book', isDone: false},
            {id: v1(), title: 'Milk', isDone: true},
        ],
    }
    const newTitle = 'HTML'

    const endState = tasksReducer(startState, changeTaskTitle(todolistId1, startState[todolistId1][0].id, newTitle));

    expect(startState[todolistId1][0].title).toBe('CSS');

    expect(endState[todolistId1].length).toBe(4);
    expect(endState[todolistId1][0].isDone).toBe(true);
    expect(endState[todolistId1][0].title).toBe(newTitle);
})