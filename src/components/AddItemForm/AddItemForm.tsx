import React, {memo} from 'react';
import {Button} from '../Button/Button';
import {useAddItemForm} from './addItemFormHooks/useAddItemForm';

type AddItemFormProps = {
    callback: (title: string) => void
    disabled?:boolean
}

export const AddItemForm: React.FC<AddItemFormProps> = memo((props) => {
    const {callback,disabled} = props;
    const {
        newTaskTitle,
        error,
        onNewTitleChangeHandler,
        onKeyPressHandler,
        addItem
    } = useAddItemForm(callback)

    return (
        <div>
            <input
                value={newTaskTitle}
                onChange={onNewTitleChangeHandler}
                onKeyDown={onKeyPressHandler}
                className={error ? 'error-input' : ''}
                disabled={disabled}
            />
            <Button name={'+'} callback={addItem} disabled={disabled}/>
            {error && <div className="error">Error: title is required</div>}
        </div>
    );
});