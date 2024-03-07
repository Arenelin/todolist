import {ChangeEvent, KeyboardEvent, useState} from 'react';

export const useAddItemForm = (onItemAdded: (title: string) => void) => {

    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [error, setError] = useState<string | null>(null);

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error !== null && setError(null);
        setNewTaskTitle(e.currentTarget.value);
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.code === 'Enter' && newTaskTitle.trim()) {
            onItemAdded(newTaskTitle.trim());
            setNewTaskTitle('');
        } else if (e.code === 'Enter' && !newTaskTitle.trim()) {
            setError('Title is required');
        }
    }
    const addItem = () => {
        if (newTaskTitle.trim()) {
            onItemAdded(newTaskTitle.trim());
            setNewTaskTitle('');
        } else {
            setError('Title is required');
        }
    }

    return {
        newTaskTitle,
        error,
        onNewTitleChangeHandler,
        onKeyPressHandler,
        addItem
    }
}