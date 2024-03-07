import React, {memo} from 'react';
import {EditableSpan} from '../../../components/EditableSpan/EditableSpan';
import {Button} from '../../../components/Button/Button';
import {AddItemForm} from '../../../components/AddItemForm/AddItemForm';
import {Task} from './Task/Task';
import {useTodolist} from './todolistHooks/useTodolist';
import {TodolistDomainType} from '../todolistsReducer/todolists-reducer';
import {Spin} from 'antd';
import {LoadingOutlined} from '@ant-design/icons';

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

    const tasksList: JSX.Element[] = tasksForTodoList.map(t =>
        <Task key={t.id} taskId={t.id} todolistId={todolist.id}/>)

    return (
        <div>
            {todolist.entityStatus === 'loading'
                ? <Spin spinning={todolist.entityStatus === 'loading'}>
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
                </Spin>
                : <div>
                    <h3>
                        <EditableSpan title={todolist.title} onChangeTitle={onChangeTodolistTitle}/>
                        <Button name={'x'} callback={onClickRemoveTodolist}/>
                    </h3>
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px'}}>
                        <AddItemForm callback={addTaskForCurrentTodolist}/>
                        {todolist.entityStatus === 'addingTaskEntity' &&
                            <Spin indicator={<LoadingOutlined
                                style={{fontSize: 20}} spin rev={undefined}/>}/>}
                    </div>
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
                </div>}

        </div>
    )
})