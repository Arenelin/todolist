type TaskType = {
    taskId: number
    title: string
    isDone: boolean
}


export type DataType = {
    title: string
    tasks: Array<TaskType>
    students: Array<string>
}


type TasksPropsType = {
    data: DataType
}

export function Tasks(props: TasksPropsType) {
    return (
        <div>
            <h2>{props.data.title}</h2>
            <ul>
                {props.data.tasks.map(t =>
                    <li key={t.taskId}>
                        <span>{t.title}</span>
                        <input type="checkbox" checked={t.isDone}/>
                    </li>
                )}
            </ul>
            <ul>
                {props.data.students.map(s =>
                    <li key={s}>
                        {s}
                    </li>
                )}
            </ul>
        </div>
    )
}