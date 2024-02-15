import React, {memo} from 'react';

type ButtonProps = {
    title: string
    callback: () => void
    isDisabled?: boolean
    className?: string
}

export const Button: React.FC<ButtonProps> = memo((props) => {
    const {
        title,
        callback,
        isDisabled,
        className
    } = props;
    console.log('Button re-render')
    const onClickHandler = () => {
        callback();
    }
    return <button className={className} disabled={isDisabled} onClick={onClickHandler}>{title}</button>
})