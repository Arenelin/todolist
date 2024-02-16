import React from 'react';
import '../../App.css';
import {AddItemForm} from '../AddItemForm/AddItemForm';
import {TodoList} from '../Todolist/TodoList';
import {useApp} from './hooks/useApp';

function App() {

    const {todolists, addNewTodolist} = useApp()
    const listTodolists = todolists.map(tl => <TodoList key={tl.id} todolist={tl}/> )

    return (
        <div className="App">
            <AddItemForm callback={addNewTodolist}/>
            {listTodolists}
        </div>
    );
}

export default App;