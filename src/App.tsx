import React, {useCallback} from 'react';
import './App.css';
import {TaskType, Todolist} from './components/Todolist';
import {AddItemForm} from './components/AddItemForm';
import {addTodolist} from './reducers/todolists-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootState} from './store/store';

export type FilterValuesType = 'all' | 'active' | 'completed';

export type todolistType = {
    id: string,
    title: string,
    filter: FilterValuesType
}

export type TaskObjType = {
    [key: string]: TaskType[]
}

function App() {
    console.log('re-render App')
    const dispatch = useDispatch();
    const todolists =
        useSelector<AppRootState, todolistType[]>(state => state.todolists)

    const addNewTodolist = useCallback((title: string) => {
        const action = addTodolist(title)
        dispatch(action)
    },[dispatch, addTodolist])

    return (
        <div className="App">
            <AddItemForm callback={addNewTodolist}/>
            {todolists.map(tl => {
                return <Todolist key={tl.id} todolist={tl}/>
            })}
        </div>
    );
}

export default App;