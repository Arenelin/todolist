import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button} from '../Button';

type AddItemFormProps = {
    callback: (title: string) => void
}

export const AddItemForm: React.FC<AddItemFormProps> = (props) => {
    const {callback} = props;

    const [title, setTitle] = useState('');
    const [error, setError] = useState(false);

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
        error && setError(false);
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && title) {
            onClickAddItemHandler()
        }
    }
    const onClickAddItemHandler = () => {
        if (title.trim()) {
            callback(title.trim());
        } else {
            setError(true);
        }
        setTitle('');
    }
    return (
        <div>
            <input
                value={title}
                onChange={onChangeTitleHandler}
                onKeyDown={onKeyDownHandler}
                className={error ? 'error-input' : ''}
            />
            <Button title={'+'} callback={onClickAddItemHandler} isDisabled={!title}/>
            {error && <div className="error">Error: title is required</div>}
        </div>
    );
};