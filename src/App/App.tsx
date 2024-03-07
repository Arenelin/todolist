import React from 'react';
import './App.css';
import {AddItemForm} from '../components/AddItemForm/AddItemForm';
import {useApp} from './appHooks/useApp';
import {TodolistsList} from '../features/Todolists/TodolistsList';
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar';
import {Spin} from 'antd';
import {LoadingOutlined} from '@ant-design/icons';

type AppProps = {
    demo?: boolean
}

export const App: React.FC<AppProps> = (props) => {
    const {demo = false} = props;
    const {addNewTodolist, status} = useApp()
    return (
        <div className="App">
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px'}}>
                <AddItemForm callback={addNewTodolist}/>
                {status === 'addingTodolistEntity' &&
                    <Spin
                        indicator={<LoadingOutlined style={{fontSize: 20}} spin rev={undefined}/>}
                    />}
            </div>
            <TodolistsList demo={demo}/>
            {status === 'loading' &&
                <Spin spinning={true} fullscreen/>}
            <ErrorSnackbar/>
        </div>
    );
}