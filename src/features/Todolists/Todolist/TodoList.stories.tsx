import {ReduxStoreProviderDecorator} from '../../../stories/decorators/ReduxStoreProviderDecorator';
import {TodoList} from './TodoList';

export default {
    title: 'Todolist Component',
    component: TodoList,
    decorators: [ReduxStoreProviderDecorator]
}


export const TodoListBaseExample = () => {
    return <TodoList todolist={{id: 'todolistId1', title: 'What to learn', filter: 'all', addedDate:'', order:0}}/>
}