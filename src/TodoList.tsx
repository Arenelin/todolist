import {FilterValues} from './App';
import React, {ChangeEvent} from 'react';
import {AddItemForm} from './components/AddItemForm';
import {EditableSpan} from './components/EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import {pink} from '@mui/material/colors';

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
                <div key={t.id}>
                    <Checkbox
                        checked={t.isDone}
                        onChange={onChangeStatusTaskHandler}
                        sx={{
                            color: pink[800],
                            '&.Mui-checked': {
                                color: pink[600],
                            },
                        }}/>

                    <EditableSpan title={t.title} onChangeTitle={onChangeTaskTitleHandler}/>
                    <IconButton onClick={onRemoveHandler} aria-label="delete">
                        <DeleteIcon/>
                    </IconButton>
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
                <IconButton onClick={onClickRemoveTodolist} aria-label="delete">
                    <DeleteIcon/>
                </IconButton>
            </h3>
            <AddItemForm callback={addTaskForCurrentTodolist}/>
            <ul>
                {tasksList}
            </ul>
            <div>
                <Button
                    variant={filter === 'all' ? 'contained' : 'text'}
                    onClick={() => changeFilterInTodolist('all')}>All</Button>
                <Button variant={filter === 'active' ? 'contained' : 'text'}
                        color={'primary'}
                        onClick={() => changeFilterInTodolist('active')}>Active</Button>
                <Button variant={filter === 'completed' ? 'contained' : 'text'}
                        color={'secondary'}
                        onClick={() => changeFilterInTodolist('completed')}>Completed</Button>
            </div>
        </div>
    )
}