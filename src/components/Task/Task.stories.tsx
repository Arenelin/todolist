import {Task} from './Task';
import {ReduxStoreProviderDecorator} from '../../stories/decorators/ReduxStoreProviderDecorator';

export default {
    title: 'Task Component',
    component: Task,
    decorators: [ReduxStoreProviderDecorator]
}


export const TaskBaseExample = () => {
    return (
        <>
            <Task todolistId={'todolistId1'} taskId={'1'}/>
            <Task todolistId={'todolistId2'} taskId={'2'}/>
        </>
    )
}