import React, {memo} from 'react';
import {Button} from '../Button/Button';
import {useAddItemForm} from './hooks/useAddItemForm';

type AddItemFormProps = {
    callback: (title: string) => void
}

export const AddItemForm: React.FC<AddItemFormProps> = memo((props) => {
    const {callback} = props;
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
            />
            <Button name={'+'} callback={addItem}/>
            {error && <div className="error">Error: title is required</div>}
        </div>
    );
});