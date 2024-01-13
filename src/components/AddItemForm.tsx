import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

type AddItemFormProps = {
    callback: (title: string) => void
}

export const AddItemForm: React.FC<AddItemFormProps> = (props) => {
    const {callback} = props;

    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [error, setError] = useState<string | null>(null);

    //Создать title для будущей задачи
    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null);
        setNewTaskTitle(e.currentTarget.value);
    }

    //Запустить функцию добавления элемента с помощью 'Enter'
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13 && newTaskTitle.trim()) {
            callback(newTaskTitle.trim());
            setNewTaskTitle('');
        } else {
            setError('Title is required');
        }
    }

    //Добавить элемент в список
    const addItem = () => {
        if (newTaskTitle.trim()) {
            callback(newTaskTitle.trim());
            setNewTaskTitle('');
        } else {
            setError('Title is required');
        }

    }
    return (
        <div>
            <TextField
                variant={'outlined'}
                label={'Type value'}
                value={newTaskTitle}
                onChange={onNewTitleChangeHandler}
                onKeyPress={onKeyPressHandler}
                className={error ? 'error' : ''}
                error={!!error}
                helperText={error}
            />
            <IconButton onClick={addItem} color={'primary'}> <AddIcon/></IconButton>

        </div>
    );
};