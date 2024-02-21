import React, {memo} from 'react';
import {EditableSpan} from '../EditableSpan/EditableSpan';
import {Button} from '../Button/Button';
import {AddItemForm} from '../AddItemForm/AddItemForm';
import {Task} from '../Task/Task';
import {useTodolist} from './hooks/useTodolist';
import {TodolistDomainType} from '../../state/reducers/todolists-reducer';

type TodoListProps = {
    todolist: TodolistDomainType
}

export const TodoList: React.FC<TodoListProps> = memo((props) => {
    const {todolist} = props;
    const {
        tasksForTodoList,
        addTaskForCurrentTodolist,
        onClickRemoveTodolist,
        onChangeTodolistTitle,
        changeAllFilterHandler,
        changeActiveFilterHandler,
        changeCompletedFilterHandler
    } = useTodolist(todolist)

    const tasksList: JSX.Element[] = tasksForTodoList.map(t =>
        <Task key={t.id} taskId={t.id} todolistId={todolist.id}/>)

    return (
        <div>
            <h3>
                <EditableSpan title={todolist.title} onChangeTitle={onChangeTodolistTitle}/>
                <Button name={'x'} callback={onClickRemoveTodolist}/>
            </h3>
            <AddItemForm callback={addTaskForCurrentTodolist}/>
            <ul>
                {tasksList}
            </ul>
            <div>
                <Button
                    className={todolist.filter === 'all' ? 'btn-active' : ''}
                    name={'All'}
                    callback={changeAllFilterHandler}
                />
                <Button
                    className={todolist.filter === 'active' ? 'btn-active' : ''}
                    name={'Active'}
                    callback={changeActiveFilterHandler}
                />
                <Button
                    className={todolist.filter === 'completed' ? 'btn-active' : ''}
                    name={'Completed'}
                    callback={changeCompletedFilterHandler}
                />
            </div>
        </div>
    )
})