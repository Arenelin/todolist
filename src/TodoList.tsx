import {FilterValues} from './App';
import React, {ChangeEvent} from 'react';
import {Button} from './Button';
import {AddItemForm} from './components/AddItemForm';
import {EditableSpan} from './components/EditableSpan';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListProps = {
    todolistId: string
    title: string
    tasks: TaskType[]
    filter: FilterValues
    removeTask: (id: string, todolistId: string) => void
    changeFilter: (value: FilterValues, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, newTaskStatus: boolean, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
    changeTaskTitle: (title: string, todolistId: string, taskId: string) => void
    changeTodolistTitle: (title: string, todolistId: string) => void
}

export const TodoList: React.FC<TodoListProps> = (props) => {
    const {
        todolistId,
        title,
        tasks,
        filter,
        removeTask,
        changeFilter,
        addTask,
        changeTaskStatus,
        removeTodolist,
        changeTaskTitle,
        changeTodolistTitle
    } = props;

    //Фильтрация отображения тасок, в зависимости от свойства filter в конкретном тудулисте
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

            //Удалить задачу из списка
            const onRemoveHandler = () => {
                removeTask(t.id, todolistId);
            }

            //Изменить название задачи
            const onChangeTaskTitleHandler = (title: string) => {
                changeTaskTitle(title, todolistId, t.id);
            }

            //Изменить статус задачи на противоположный
            const onChangeStatusTaskHandler = (e: ChangeEvent<HTMLInputElement>) => {
                changeTaskStatus(t.id, e.currentTarget.checked, todolistId);
            }

            return (
                <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                    <input checked={t.isDone} type="checkbox" onChange={onChangeStatusTaskHandler}/>
                    <EditableSpan title={t.title} onChangeTitle={onChangeTaskTitleHandler}/>
                    <Button name={'x'} callback={onRemoveHandler}/>
                </li>
            )
        }
    );

    //Добавление задачи в конкретный тудулист
    const addTaskForCurrentTodolist = (title: string) => {
        addTask(title, todolistId);
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
                <Button name={'x'} callback={onClickRemoveTodolist}/>
            </h3>
            <AddItemForm callback={addTaskForCurrentTodolist}/>
            <ul>
                {tasksList}
            </ul>
            <div>
                <Button className={filter === 'all' ? 'active-filter' : ''}
                        name={'All'}
                        callback={() => changeFilterInTodolist('all')}/>
                <Button className={filter === 'active' ? 'active-filter' : ''}
                        name={'Active'}
                        callback={() => changeFilterInTodolist('active')}/>
                <Button className={filter === 'completed' ? 'active-filter' : ''}
                        name={'Completed'}
                        callback={() => changeFilterInTodolist('completed')}/>
            </div>
        </div>
    )
}