import {v1} from 'uuid';
import {
    addNewTask,
    changeTaskEntityStatus,
    changeTaskValues,
    deleteTask,
    setTasks,
    tasksReducer,
    TasksState
} from './tasks-reducer';
import {addTodolist, deleteTodolist} from '../todolistsReducer/todolists-reducer';
import {TaskPriorities, TaskStatuses} from '../../../api/tasks-api';
import {TodolistType} from '../../../api/todolists-api';
import {RequestStatusType} from "../../../App/app-reducer/app-reducer";

let todolistId1 = v1()
let todolistId2 = v1()
let todolistId3 = v1()


let startState: TasksState;
beforeEach(() => {
    startState = {
        [todolistId1]: [
            {
                id: '1',
                title: 'CSS',
                status: TaskStatuses.New,
                todoListId: todolistId1,
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: '',
                entityStatus: 'idle'
            },
            {
                id: '2',
                title: 'JS',
                status: TaskStatuses.Completed,
                todoListId: todolistId1,
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: '',
                entityStatus: 'idle'
            },
            {
                id: '3',
                title: 'React',
                status: TaskStatuses.New,
                todoListId: todolistId1,
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: '',
                entityStatus: 'idle'
            },
            {
                id: '4',
                title: 'Redux',
                status: TaskStatuses.New,
                todoListId: todolistId1,
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: '',
                entityStatus: 'idle'
            },
        ],
        [todolistId2]: [
            {
                id: '1',
                title: 'Book',
                status: TaskStatuses.New,
                todoListId: todolistId2,
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: '',
                entityStatus: 'idle'
            },
            {
                id: '2',
                title: 'Milk',
                status: TaskStatuses.Completed,
                todoListId: todolistId2,
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: '',
                entityStatus: 'idle'
            },
        ],
    }
})

test('correct task should be removed', () => {
    const endState = tasksReducer(startState, deleteTask(todolistId1, '2'))
    expect(endState[todolistId2].length).toBe(2)

    expect(endState[todolistId1].length).toBe(3);
    expect(endState[todolistId1][2].title).toBe('Redux');
    expect(endState[todolistId1].every(t => t.id !== '2')).toBeTruthy()


})

test('correct task should be added', () => {
    const newTaskForTech = {
        id: '0',
        title: 'Redux Toolkit',
        status: TaskStatuses.New,
        todoListId: todolistId1,
        startDate: '',
        deadline: '',
        addedDate: '',
        order: 0,
        priority: TaskPriorities.Low,
        description: ''
    }
    const newTaskForProducts = {
        id: '0',
        title: 'Meat',
        status: TaskStatuses.New,
        todoListId: todolistId2,
        startDate: '',
        deadline: '',
        addedDate: '',
        order: 0,
        priority: TaskPriorities.Low,
        description: ''
    }

    const endState = tasksReducer(startState, addNewTask(newTaskForTech))

    const endState2 = tasksReducer(startState, addNewTask(newTaskForProducts))

    expect(startState[todolistId1].length).toBe(4);

    expect(endState[todolistId1].length).toBe(5);
    expect(endState[todolistId1][0].id).toBeDefined()
    expect(endState[todolistId1][0].title).toBe(newTaskForTech.title);
    expect(endState[todolistId1][0].status).toBe(TaskStatuses.New);

    expect(endState2[todolistId2].length).toBe(3);
    expect(endState2[todolistId2][0].id).toBeDefined()
    expect(endState2[todolistId2][0].title).toBe(newTaskForProducts.title);
    expect(endState2[todolistId2][0].status).toBe(TaskStatuses.New);
})
test('status of specified task should be changed', () => {
    const newValue = TaskStatuses.Completed;

    const endState =
        tasksReducer(startState, changeTaskValues(todolistId2, '1', {status: newValue}));

    expect(endState[todolistId2].length).toBe(2);
    expect(endState[todolistId2][0].status).toBe(newValue); //true
    expect(endState[todolistId2][0].title).toBe('Book');
    expect(endState[todolistId1][0].status).toBe(TaskStatuses.New)

    expect(startState[todolistId2][0].status).toBe(TaskStatuses.New);
})
test('title of specified task should be changed', () => {
    const newTitle = 'HTML'

    const endState =
        tasksReducer(startState, changeTaskValues(todolistId1, '1', {title: newTitle}));

    expect(startState[todolistId1][0].title).toBe('CSS');

    expect(endState[todolistId1].length).toBe(4);
    expect(endState[todolistId1][0].status).toBe(TaskStatuses.New);
    expect(endState[todolistId1][0].title).toBe(newTitle);
    expect(endState[todolistId2][0].title).toBe('Book')
})
test('new property with new array should be added when new todolist is added', () => {
    const newTodolistTitle = 'no matter'
    const newTodolist: TodolistType = {
        id: todolistId3,
        title: newTodolistTitle,
        addedDate: '',
        order: 0
    }

    const endState = tasksReducer(startState, addTodolist(newTodolist))
    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != todolistId1 && k != todolistId2)
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})
test('property with todolistId should be deleted', () => {
    const action = deleteTodolist(todolistId2)

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).toBeUndefined()
})
test('tasks should be added for todolist', () => {
    const action = setTasks(todolistId1, startState[todolistId1])
    const endState = tasksReducer({
        [todolistId1]: [],
        [todolistId2]: []
    }, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(2)
    expect(endState[todolistId1].length).toBe(4)
    expect(endState[todolistId2].length).toBe(0)
    expect(endState[todolistId1][1].title).toBe('JS')
    expect(endState[todolistId2]).toStrictEqual([])
})

test('correct entity status of task should be changed', () => {
    const newStatus: RequestStatusType = 'loading'
    const endState =
        tasksReducer(startState, changeTaskEntityStatus(todolistId1, startState[todolistId1][3].id, newStatus))

    expect(endState[todolistId1][3].entityStatus).toBe(newStatus)
    expect(endState[todolistId1][3].title).toBe('Redux')
})
