import React, {memo} from 'react';

type ButtonProps = {
    name: string
    callback: () => void
    className?: string
    disabled?:boolean
}

export const Button: React.FC<ButtonProps> = memo((props) => {
    const {name, callback, className,disabled} = props;
    console.log('Button re-render')
    const onClickHandler = () => {
        callback();
    }
    return <button disabled={disabled} className={className ? className : ''} onClick={onClickHandler}>{name}</button>
})