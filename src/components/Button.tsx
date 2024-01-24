import React from 'react';

type ButtonProps = {
    title: string
    callback: () => void
    isDisabled?: boolean
    className?: string
}

export const Button: React.FC<ButtonProps> = (props) => {
    const {
        title,
        callback,
        isDisabled,
        className
    } = props;
    const onClickHandler = () => {
        callback();
    }
    return <button className={className} disabled={isDisabled} onClick={onClickHandler}>{title}</button>
}