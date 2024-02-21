import {useDispatch, useSelector} from 'react-redux';
import {AppRootState} from '../../../state/store';
import {useCallback} from 'react';
import {addTodolist, TodolistDomainType} from '../../../state/reducers/todolists-reducer';

export const useApp = ()=>{
    const dispatch = useDispatch()
    const todolists =
        useSelector<AppRootState, TodolistDomainType[]>(state => state.todolists)
    const addNewTodolist = useCallback((title: string) => {
        const action = addTodolist(title)
        dispatch(action)
    }, [dispatch, addTodolist])

    return {todolists, addNewTodolist}
}