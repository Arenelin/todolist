import React, {memo, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {TodolistType} from '../../AppWithRedux';
import {AppRootState} from '../../state/store';
import {addNewTask} from '../../state/reducers/tasks-reducer';
import {EditableSpan} from '../EditableSpan/EditableSpan';
import {Button} from '../../Button';
import {AddItemForm} from '../AddItemForm/AddItemForm';
import {changeTodolistFilter, changeTodolistName, deleteTodolist} from '../../state/reducers/todolists-reducer';
import {Task} from '../Task/Task';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListProps = {
    todolist: TodolistType
}

export const TodoList: React.FC<TodoListProps> = memo((props) => {
    const {todolist} = props;

    console.log('re-render Todolist')
    const dispatch = useDispatch();

    //Достали массив тасок для конкретного тудулиста
    const tasks =
        useSelector<AppRootState, TaskType[]>(state => state.tasks[todolist.id])

    let tasksForTodoList = todolist.filter === 'active'
        ? tasks.filter(t => !t.isDone)
        : todolist.filter === 'completed'
            ? tasks.filter(t => t.isDone)
            : tasks;

    const tasksList: JSX.Element[] = tasksForTodoList.map(t =>
        <Task taskId={t.id} key={t.id} todolistId={todolist.id}/>
    );

    //Добавление таски
    const addTaskForCurrentTodolist = useCallback((title: string) => {
        dispatch(addNewTask(todolist.id, title))
    }, [todolist.id]);

    //Удаление конкретного тудулиста
    const onClickRemoveTodolist = useCallback(() => {
        dispatch(deleteTodolist(todolist.id))
    }, [dispatch, todolist.id])

    //Сменить заголовок конкретного тудулиста
    const onChangeTodolistTitle = useCallback((title: string) => {
        dispatch(changeTodolistName(todolist.id, title))
    }, [dispatch, todolist.id])

    //Смена фильтра конкретного тудулиста
    const changeAllFilterHandler = useCallback(() => {
        dispatch(changeTodolistFilter(todolist.id, 'all'))
    }, [todolist.id])
    const changeActiveFilterHandler = useCallback(() => {
        dispatch(changeTodolistFilter(todolist.id, 'active'))
    }, [todolist.id])
    const changeCompletedFilterHandler = useCallback(() => {
        dispatch(changeTodolistFilter(todolist.id, 'completed'))
    }, [dispatch, todolist.id])

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