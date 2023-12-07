export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
}

export function TodoList(props: TodoListPropsType) {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                <li><input checked={props.tasks[0].isDone} type="checkbox"/>{props.tasks[0].title}<span></span></li>
                <li><input checked={props.tasks[1].isDone} type="checkbox"/><span>{props.tasks[1].title}</span></li>
                <li><input checked={props.tasks[2].isDone} type="checkbox"/><span>{props.tasks[2].title}</span></li>
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    )
}