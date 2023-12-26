type ButtonPropsType = {
    title: string
    callback: () => void
    isDisabled?: boolean
    className?:string
}

export function Button(props: ButtonPropsType) {
    const onClickHandler = () => {
        props.callback();
    }
    return <button className={props.className} disabled={props.isDisabled} onClick={onClickHandler}>{props.title}</button>
}