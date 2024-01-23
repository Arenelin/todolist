import {FilterValues} from './components/App';
import React, {ChangeEvent} from 'react';
import {AddItemForm} from './components/AddItemForm';
import {EditableSpan} from './components/EditableSpan';
import {Button} from './Button';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootState} from './state/store';
import {TasksState} from './AppWithRedux';
import {addNewTask, changeTaskStatus, changeTitleForTask, deleteTask} from './state/tasks-reducer';

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

    const dispatch = useDispatch();
    const tasksObj =
        useSelector<AppRootState, TaskType[]>(state => state.tasks[props.todolistId])
    //Достали массив тасок для конкретного тудулиста


    function addTask(title: string, todolistId: string) {
        dispatch(addNewTask(todolistId, title))
    }

    const changeStatus = (taskId: string, newTaskStatus: boolean, todolistId: string) => {
        dispatch(changeTaskStatus(todolistId, taskId, newTaskStatus))
    }

    function removeTask(id: string, todolistId: string) {
        dispatch(deleteTask(todolistId, id))
    }

    const changeTaskTitle = (title: string, todolistId: string, taskId: string) => {
        dispatch(changeTitleForTask(todolistId, taskId, title))
    }

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
                <div key={t.id}>
                    <input type="checkbox" checked={t.isDone} onChange={onChangeStatusTaskHandler}/>
                    <EditableSpan title={t.title} onChangeTitle={onChangeTaskTitleHandler}/>
                    <Button name={'x'} callback={onRemoveHandler}/>
                </div>
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