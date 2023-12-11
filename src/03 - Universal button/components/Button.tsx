type ButtonPropsType = {
    name: string
    callback: () => void
}

export function Button(props: ButtonPropsType) {
    const onClickHandler = () => {
        props.callback()
    }
    return <button onClick={onClickHandler}>{props.name}</button>
}

//Алгоритм создания универсальнйо кнопки:
//1.  Прокидываем через props name
//2.  Прокидываем через props callback