import React from 'react';
import './App.css';
import {AddItemForm} from '../components/AddItemForm/AddItemForm';
import {useApp} from './appHooks/useApp';
import {TodolistsList} from '../features/Todolists/TodolistsList';

function App() {
    const {todolists, addNewTodolist} = useApp()
    return (
        <div className="App">
            <AddItemForm callback={addNewTodolist}/>
            <TodolistsList todolists={todolists}/>
        </div>
    );
}

export default App;