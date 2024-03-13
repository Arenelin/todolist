import React, {memo} from 'react';
import {EditableSpan} from '../../../components/EditableSpan/EditableSpan';
import {Button} from '../../../components/Button/Button';
import {AddItemForm} from '../../../components/AddItemForm/AddItemForm';
import {Task} from './Task/Task';
import {useTodolist} from './todolistHooks/useTodolist';
import {TodolistDomainType} from '../todolistsReducer/todolists-reducer';
import Skeleton from '@mui/material/Skeleton';

type TodoListProps = {
    todolist: TodolistDomainType
    demo?: boolean
}

export const TodoList: React.FC<TodoListProps> = memo((props) => {
    const {todolist, demo = false} = props;
    const {
        tasksForTodoList,
        addTaskForCurrentTodolist,
        onClickRemoveTodolist,
        onChangeTodolistTitle,
        changeAllFilterHandler,
        changeActiveFilterHandler,
        changeCompletedFilterHandler
    } = useTodolist(todolist, demo)

    const tasksList: JSX.Element[] = tasksForTodoList.map(t => {
            return todolist.entityStatus === 'loading'
                ? <Skeleton key={t.id}><Task taskId={t.id} todolistId={todolist.id}/></Skeleton>
                : <Task key={t.id} taskId={t.id} todolistId={todolist.id}/>
        }
    )

    return (
        <div>
            <div>
                <h3>
                    <EditableSpan title={todolist.title} onChangeTitle={onChangeTodolistTitle}/>
                    <Button name={'x'} callback={onClickRemoveTodolist} disabled={todolist.entityStatus === 'loading'}/>
                </h3>
                <AddItemForm callback={addTaskForCurrentTodolist} disabled={todolist.entityStatus === 'loading'}/>
                <div>
                    <ul>
                        {tasksList}
                    </ul>
                    <div>
                        <Button
                            disabled={todolist.entityStatus === 'loading'}
                            className={todolist.filter === 'all' ? 'btn-active' : ''}
                            name={'All'}
                            callback={changeAllFilterHandler}
                        />
                        <Button
                            disabled={todolist.entityStatus === 'loading'}
                            className={todolist.filter === 'active' ? 'btn-active' : ''}
                            name={'Active'}
                            callback={changeActiveFilterHandler}
                        />
                        <Button
                            disabled={todolist.entityStatus === 'loading'}
                            className={todolist.filter === 'completed' ? 'btn-active' : ''}
                            name={'Completed'}
                            callback={changeCompletedFilterHandler}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
})