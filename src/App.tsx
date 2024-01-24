import React from 'react';
import './App.css';
import {TaskType, TodoList} from './components/TodoList';
import {AddItemForm} from './components/AddItemForm';
import {addTodolist, changeTitleForTodolist, deleteTodolist, setNewFilterValue} from './reducers/todolists-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootType} from './store/store';

export type FilterValuesType = 'all' | 'active' | 'completed';

export type TaskObjectType = {
    [key: string]: TaskType[]
}
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {
    const dispatch = useDispatch();
    const todolists =
        useSelector<AppRootType, TodolistType[]>(state => state.todolists)

    const filteredTasks = (todolistId: string, filterValue: FilterValuesType) => {
        dispatch(setNewFilterValue(todolistId, filterValue));
    }

    const removeTodolist = (todolistId: string) => {
        dispatch(deleteTodolist(todolistId));
    }

    const addNewTodolist = (title: string) => {
        const action = addTodolist(title);
        dispatch(action);
    }

    const changeTodolistTitle = (todolistId: string, title: string) => {
        dispatch(changeTitleForTodolist(todolistId, title));
    }

    return (
        <div className="App">
            <AddItemForm callback={addNewTodolist}/>
            {todolists.map(tl => {
                    return (
                        <TodoList
                            key={tl.id}
                            todolistId={tl.id}
                            titleForTodolist={tl.title}
                            filter={tl.filter}
                            filteredTasks={filteredTasks}
                            removeTodolist={removeTodolist}
                            changeTodolistTitle={changeTodolistTitle}
                        />
                    )
                }
            )}
        </div>
    );
}

export default App;