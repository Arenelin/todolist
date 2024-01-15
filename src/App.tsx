import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from './TodoList';
import {v1} from 'uuid';
import {AddItemForm} from './components/AddItemForm';
import AppBar from '@mui/material/AppBar/AppBar';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

export type FilterValues = 'all' | 'active' | 'completed';

export type TodolistType = {
    id: string
    title: string
    filter: FilterValues
}

type TasksState = {
    [key: string]: TaskType[]
}

function App() {
    //Переменные с id для каждого тудулиста
    const todolist_1 = v1();
    const todolist_2 = v1();

    //Стейт с тудулистами
    const [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolist_1, title: 'What to learn', filter: 'all'},
        {id: todolist_2, title: 'What to buy', filter: 'all'},
    ]);

    //Стейт с тасками для каждого тудулиста в отдельности
    const [tasksObj, setTasksObj] = useState<TasksState>({
        [todolist_1]: [
            {id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'Redux', isDone: false},
        ],
        [todolist_2]: [
            {id: v1(), title: 'Book', isDone: false},
            {id: v1(), title: 'Milk', isDone: true},
        ],
    });

    //Добавление новой таски в конкретный тудулист
    function addTask(title: string, todolistId: string) {
        setTasksObj({...tasksObj, [todolistId]: [...tasksObj[todolistId], {id: v1(), title, isDone: false}]});
    }

    //Смена статуса таски в конкретном тудулисте
    const changeStatus = (taskId: string, newTaskStatus: boolean, todolistId: string) => {
        setTasksObj({
            ...tasksObj, [todolistId]: tasksObj[todolistId].map(t => t.id === taskId
                ? {...t, isDone: newTaskStatus}
                : t)
        });
    }

    //Удаление таски из конкретного тудулиста
    function removeTask(id: string, todolistId: string) {
        setTasksObj({...tasksObj, [todolistId]: tasksObj[todolistId].filter(t => t.id !== id)});
    }

    //Фильтрация отображения тасок в конкретном тудулисте
    function changeFilter(value: FilterValues, todolistId: string) {
        setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, filter: value} : tl));
    }

    //Удаление конкретного тудулиста
    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(tl => tl.id !== todolistId));
        delete tasksObj[todolistId];
    }

    //Добавление нового тудулиста
    const addNewTodolist = (title: string) => {
        const idNewTodolist = v1();
        setTodolists([...todolists, {id: idNewTodolist, title, filter: 'all'}]);
        setTasksObj({...tasksObj, [idNewTodolist]: []});
    }

    //Смена названия таски в конкретном тудулисте
    const changeTaskTitle = (title: string, todolistId: string, taskId: string) => {
        setTasksObj({
            ...tasksObj, [todolistId]: tasksObj[todolistId].map(t =>
                t.id === taskId ? {...t, title} : t)
        });
    }

    //Смена заголовка конкретного тудулиста
    const changeTodolistTitle = (newTodolistTitle: string, todolistId: string,) => {
        setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, title: newTodolistTitle} : tl));
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '10px'}}>
                    <AddItemForm callback={addNewTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolists.map(tl => {
                            return (
                                <Grid item>
                                    <Paper style={{padding: '10px'}}>
                                        <TodoList
                                            key={tl.id}
                                            todolistId={tl.id}
                                            title={tl.title}
                                            tasks={tasksObj[tl.id]}
                                            filter={tl.filter}
                                            removeTask={removeTask}
                                            changeFilter={changeFilter}
                                            addTask={addTask}
                                            changeTaskStatus={changeStatus}
                                            removeTodolist={removeTodolist}
                                            changeTaskTitle={changeTaskTitle}
                                            changeTodolistTitle={changeTodolistTitle}
                                        />
                                    </Paper>
                                </Grid>
                            )
                        }
                    )}
                </Grid>
            </Container>
        </div>
    );
}

export default App;