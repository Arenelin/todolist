import {useEffect} from 'react';
import {getTodolists} from '../todolistsReducer/todolists-reducer';
import {useAppDispatch, useAppSelector} from '../../../hooks/hooks';

export const useTodolistList = (demo: boolean) => {
    const dispatch = useAppDispatch()
    const todolists =
        useAppSelector(state => state.todolists)
    useEffect(() => {
        if (!demo) {
            dispatch(getTodolists())
        }
    }, []);
    return {todolists}
}