import React from 'react';
import './App.css';
import {TaskType, Todolist} from './components/Todolist';
import {AddItemForm} from './components/AddItemForm';
import {addTodolist, changeTitleForTodolist, changeTodolistFilter, deleteTodolist} from './reducers/todolists-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootState} from './store/store';

export type FilterValuesType = 'all' | 'active' | 'completed';

export type todolistsType = {
    id: string,
    title: string,
    filter: FilterValuesType
}

export type TaskObjType = {
    [key: string]: TaskType[]
}

function App() {
    const dispatch = useDispatch();
    const todolists =
        useSelector<AppRootState, todolistsType[]>(state => state.todolists)

    const changeFilterTodolistForFilteredTasks = (todolistId: string, valueFilter: FilterValuesType) => {
        dispatch(changeTodolistFilter(todolistId, valueFilter))
    }

    const removeTodolist = (todolistId: string) => {
        dispatch(deleteTodolist(todolistId))
    }

    const addNewTodolist = (title: string) => {
        const action = addTodolist(title)
        dispatch(action)
    }

    const changeTodolistTitle = (todolistId: string, title: string) => {
        dispatch(changeTitleForTodolist(todolistId, title))
    }

    return (
        <div className="App">
            <AddItemForm callback={addNewTodolist}/>
            {todolists.map(tl => {
                return (
                    <Todolist
                        key={tl.id}
                        todolistId={tl.id}
                        title={tl.title}
                        filter={tl.filter}
                        changeFilterTodolistForFilteredTasks={changeFilterTodolistForFilteredTasks}
                        removeTodolist={removeTodolist}
                        changeTodolistTitle={changeTodolistTitle}
                    />)

            })}

        </div>
    );
}

export default App;