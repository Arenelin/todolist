import React, {ChangeEvent, KeyboardEvent, memo, useState} from 'react';
import {Button} from '../Button';

export type AddItemFormProps = {
    callback: (title: string) => void
    disabled?: boolean
}

export const AddItemForm: React.FC<AddItemFormProps> = memo((props) => {
    const {callback, disabled} = props;

    const [title, setTitle] = useState('');
    const [inputError, setInputError] = useState(false);

    const addTaskOnKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && title) {
            addTaskHandler();
        }
    }

    const addTaskHandler = () => {
        if (title.trim()) {
            callback(title.trim());

        } else {
            setInputError(true);
        }
        setTitle('');
    };

    const onChangeTaskTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        inputError && setInputError(false);
    }

    return (
        <div>
            <input value={title}
                   onChange={onChangeTaskTitle}
                   onKeyDown={addTaskOnKeyDownHandler}
                   className={inputError ? 'input-error' : ''}
                   disabled={disabled}
            />

            <Button callback={addTaskHandler} title={'+'} disabled={!title}/>
            {inputError && <div className={'error'}>Error: title is required</div>}
        </div>
    );
});

