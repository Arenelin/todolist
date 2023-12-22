type ButtonPropsType = {
    name: string
    callback: () => void
    className?: string
}

export function Button(props: ButtonPropsType) {
    const onClickHandler = () => {
        props.callback();
    }
    return <button className={props.className ? props.className : ''} onClick={onClickHandler}>{props.name}</button>
}