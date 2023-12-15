import React, {ChangeEvent, ChangeEventHandler, useState} from 'react';


type FullInputPropsType = {
    addMessage: (messageTitle: string) => void
}

export const FullInput = (props: FullInputPropsType) => {
    const [title, setTitle] = useState('');
    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    }
    const onClickButtonHandler = () => {
        props.addMessage(title);
        setTitle('');
    }

    return (
        <div>
            <input value={title} onChange={onChangeInputHandler}/>
            <button onClick={onClickButtonHandler}>+</button>
        </div>
    );
};