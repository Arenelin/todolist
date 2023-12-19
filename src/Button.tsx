type ButtonPropsType = {
    title: string
    callback: () => void
    isDisabled?: boolean
}

export function Button(props: ButtonPropsType) {
    const onClickHandler = () => {
        props.callback();
    }
    return <button disabled={props.isDisabled} onClick={onClickHandler}>{props.title}</button>
}