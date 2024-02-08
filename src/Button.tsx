import React, {memo} from 'react';

type ButtonProps = {
    name: string
    callback: () => void
    className?: string
}

export const Button: React.FC<ButtonProps> = memo((props) => {
    const {name, callback, className} = props;
    console.log('Button re-render')
    const onClickHandler = () => {
        callback();
    }
    return <button className={className ? className : ''} onClick={onClickHandler}>{name}</button>
})