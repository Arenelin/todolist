import React from 'react';
import {TodoList} from './Todolist/TodoList';
import {useTodolistList} from './todolistsListHooks/useTodolistList';
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {Navigate} from "react-router-dom";
import Button from "@mui/material/Button";

type TodolistsListProps = {
    demo?: boolean
}

export const TodolistsList: React.FC<TodolistsListProps> = (props) => {
    const {demo = false} = props;
    const {todolists, addNewTodolist, logoutHandler, isLoggedIn} = useTodolistList(demo)
    const listTodolists = todolists.map(tl =>
        <TodoList key={tl.id} todolist={tl} demo={demo}/>)
    if (!isLoggedIn) return <Navigate to={'/login'}/>
    // debugger
    return (
        <>
            <AddItemForm callback={addNewTodolist}/>
            {isLoggedIn && <Button variant={'contained'} onClick={logoutHandler}>Log Out</Button>}
            {listTodolists}
        </>
    )
};