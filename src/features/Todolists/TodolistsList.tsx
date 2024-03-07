import React from 'react';
import {TodoList} from './Todolist/TodoList';
import {useTodolistList} from './todolistsListHooks/useTodolistList';

type TodolistsListProps = {
    demo?: boolean
}

export const TodolistsList: React.FC<TodolistsListProps> = (props) => {
    const {demo = false} = props;
    const {todolists} = useTodolistList(demo)
    const listTodolists = todolists.map(tl =>
        <TodoList key={tl.id} todolist={tl} demo={demo}/>)
    return (
        <>
            {listTodolists}
        </>
    )
};