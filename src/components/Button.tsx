import React, {memo} from 'react';

type ButtonProps = {
    title: string
    callback: () => void
    disabled?: boolean
    className?: string
}

export const Button: React.FC<ButtonProps> = memo((props) => {
    const {
        title,
        callback,
        disabled,
        className
    } = props;
    console.log('Button re-render')
    const onClickHandler = () => {
        callback();
    }
    return <button className={className} disabled={disabled} onClick={onClickHandler}>{title}</button>
})