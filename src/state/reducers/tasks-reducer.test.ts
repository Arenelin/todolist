import {v1} from 'uuid';
import {addNewTask, changeTaskStatus, changeTitleForTask, deleteTask, tasksReducer, TasksState} from './tasks-reducer';
import {addTodolist, deleteTodolist} from './todolists-reducer';
import {TaskPriorities, TaskStatuses} from '../../api/tasks-api';

let todolistId1 = v1()
let todolistId2 = v1()

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
                description: ''
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
                description: ''
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
                description: ''
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
                description: ''
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
                description: ''
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
                description: ''
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
    const newTaskTitleForTech = 'Redux Toolkit';
    const newTaskTitleForProducts = 'Meat';

    const endState = tasksReducer(startState, addNewTask(todolistId1, newTaskTitleForTech))

    const endState2 = tasksReducer(startState, addNewTask(todolistId2, newTaskTitleForProducts))

    expect(startState[todolistId1].length).toBe(4);

    expect(endState[todolistId1].length).toBe(5);
    expect(endState[todolistId1][4].id).toBeDefined()
    expect(endState[todolistId1][4].title).toBe(newTaskTitleForTech);
    expect(endState[todolistId1][4].status).toBe(TaskStatuses.New);


    expect(endState2[todolistId2].length).toBe(3);
    expect(endState[todolistId1][2].id).toBeDefined()
    expect(endState2[todolistId2][2].title).toBe(newTaskTitleForProducts);
    expect(endState2[todolistId2][2].status).toBe(TaskStatuses.New);
})
test('status of specified task should be changed', () => {
    const newValue = TaskStatuses.Completed;

    const endState = tasksReducer(startState, changeTaskStatus(todolistId2, '1', newValue));

    expect(endState[todolistId2].length).toBe(2);
    expect(endState[todolistId2][0].status).toBe(newValue); //true
    expect(endState[todolistId2][0].title).toBe('Book');
    expect(endState[todolistId1][0].status).toBe(TaskStatuses.New)

    expect(startState[todolistId2][0].status).toBe(TaskStatuses.New);
})
test('title of specified task should be changed', () => {
    const newTitle = 'HTML'

    const endState = tasksReducer(startState, changeTitleForTask(todolistId1, '1', newTitle));

    expect(startState[todolistId1][0].title).toBe('CSS');

    expect(endState[todolistId1].length).toBe(4);
    expect(endState[todolistId1][0].status).toBe(TaskStatuses.New);
    expect(endState[todolistId1][0].title).toBe(newTitle);
    expect(endState[todolistId2][0].title).toBe('Book')
})
test('new property with new array should be added when new todolist is added', () => {
    const newTodolistTitle = 'no matter'

    const endState = tasksReducer(startState, addTodolist(newTodolistTitle))
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
