import React, {ChangeEvent, KeyboardEvent, memo, useState} from 'react';
import {Button} from '../Button';

type AddItemFormProps = {
    callback: (title: string) => void
}

export const AddItemForm: React.FC<AddItemFormProps> = memo((props) => {
    const {callback} = props;

    console.log('re-render AddItemForm')

    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [error, setError] = useState<string | null>(null);

    //Создать title для будущей задачи
    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error !== null && setError(null);
        setNewTaskTitle(e.currentTarget.value);
    }

    //Запустить функцию добавления элемента с помощью 'Enter'
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.code === 'Enter' && newTaskTitle.trim()) {
            callback(newTaskTitle.trim());
            setNewTaskTitle('');
        } else if(e.code === 'Enter' && !newTaskTitle.trim()){
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
            <input
                value={newTaskTitle}
                onChange={onNewTitleChangeHandler}
                onKeyDown={onKeyPressHandler}
                className={error ? 'error-input' : ''}
            />
            <Button name={'+'} callback={addItem}/>
            {error && <div className="error">Error: title is required</div>}
        </div>
    );
});
