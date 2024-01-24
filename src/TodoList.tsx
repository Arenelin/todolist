import React, {ChangeEvent} from 'react';
import {AddItemForm} from './components/AddItemForm';
import {EditableSpan} from './components/EditableSpan';
import {Button} from './Button';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootState} from './state/store';
import {addNewTask, changeTaskStatus, changeTitleForTask, deleteTask} from './state/tasks-reducer';
import {FilterValues} from './AppWithRedux';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListProps = {
    todolistId: string
    title: string
    filter: FilterValues
    changeFilter: (value: FilterValues, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (title: string, todolistId: string) => void
}

export const TodoList: React.FC<TodoListProps> = (props) => {
    const {
        todolistId,
        title,
        filter,
        changeFilter,
        removeTodolist,
        changeTodolistTitle
    } = props;

    const dispatch = useDispatch();

    //Достали массив тасок для конкретного тудулиста
    const tasks =
        useSelector<AppRootState, TaskType[]>(state => state.tasks[todolistId])

    let tasksForTodoList = filter === 'active'
        ? tasks.filter(t => !t.isDone)
        : filter === 'completed'
            ? tasks.filter(t => t.isDone)
            : tasks;

    //Сменить фильтр отображения списка задач
    const changeFilterInTodolist = (filterValue: FilterValues) => {
        changeFilter(filterValue, todolistId);
    }

    const tasksList: JSX.Element[] = tasksForTodoList.map(t => {
            //Удаление таски
            const onRemoveHandler = () => {
                dispatch(deleteTask(todolistId, t.id))
            }

            //Смена заголовка таски
            const onChangeTaskTitleHandler = (title: string) => {
                dispatch(changeTitleForTask(todolistId, t.id, title))
            }

            //Смена статуса таски
            const onChangeStatusTaskHandler = (e: ChangeEvent<HTMLInputElement>) => {
                dispatch(changeTaskStatus(todolistId, t.id, e.currentTarget.checked))
            }

            return (
                <div key={t.id}>
                    <input type="checkbox" checked={t.isDone} onChange={onChangeStatusTaskHandler}/>
                    <EditableSpan title={t.title} onChangeTitle={onChangeTaskTitleHandler}/>
                    <Button name={'x'} callback={onRemoveHandler}/>
                </div>
            )
        }
    );

    //Добавление таски
    const addTaskForCurrentTodolist = (title: string) => {
        dispatch(addNewTask(todolistId, title))
    }

    //Удаление конкретного тудулиста
    const onClickRemoveTodolist = () => {
        removeTodolist(todolistId);
    }

    //Сменить заголовок конкретного тудулиста
    const onChangeTodolistTitle = (title: string) => {
        changeTodolistTitle(title, todolistId);
    }

    return (
        <div>
            <h3>
                <EditableSpan title={title} onChangeTitle={onChangeTodolistTitle}/>
                <Button name={'x'}
                        callback={onClickRemoveTodolist}/>
            </h3>
            <AddItemForm callback={addTaskForCurrentTodolist}/>
            <ul>
                {tasksList}
            </ul>
            <div>
                <Button
                    className={filter === 'all' ? 'btn-active' : ''}
                    name={'All'}
                    callback={() => changeFilterInTodolist('all')}
                />
                <Button
                    className={filter === 'active' ? 'btn-active' : ''}
                    name={'Active'}
                    callback={() => changeFilterInTodolist('active')}
                />
                <Button
                    className={filter === 'completed' ? 'btn-active' : ''}
                    name={'Completed'}
                    callback={() => changeFilterInTodolist('completed')}
                />
            </div>
        </div>
    )
}