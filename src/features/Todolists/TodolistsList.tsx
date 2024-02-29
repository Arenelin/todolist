import React from 'react';
import {TodolistDomainType} from './todolistsReducer/todolists-reducer';
import {TodoList} from './Todolist/TodoList';

type TodolistsListProps = {
    todolists: TodolistDomainType[]
}

export const TodolistsList: React.FC<TodolistsListProps> = (props) => {
    const {todolists} = props;
    const listTodolists = todolists.map(tl => <TodoList key={tl.id} todolist={tl}/>)
    return (
        <>
            {listTodolists}
        </>
    )
};