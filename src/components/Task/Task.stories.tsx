import type {Meta, StoryObj} from '@storybook/react';
import {Task} from './Task';
import ReduxStoreProviderDecorator from '../../stories/decorators/ReduxStoreProviderDecorator';
import {useSelector} from 'react-redux';
import {AppRootState} from '../../store/store';
import {TaskType} from '../Todolist';

const meta: Meta<typeof Task> = {
    title: 'Todolist/Task',
    component: Task,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    decorators: [ReduxStoreProviderDecorator]
};

export default meta;
type Story = StoryObj<typeof Task>;

export const TaskIsDoneStory: Story = {
    args: {
        todolistId: 'todolistId1',
        taskId: '1'
    }
};
export const TaskIsNotDoneStory: Story = {
    args: {
        todolistId: 'todolistId2',
        taskId: '1'
    }
};
export const TaskDefaultStory: Story = {
    args: {
        todolistId: 'todolistId1',
        taskId: '2'
    }
};

const TaskContainer = () => {
    let task = useSelector<AppRootState, TaskType>(state => state.tasks['todolistId1'][0])
    return <Task taskId={task.id} todolistId={'todolistId1'}/>
}

//Надо дописать!

//Все что написано в meta args или argTypes можно переопределить в конкретном сценарии истории.
// Случай как в CSS со стилями

