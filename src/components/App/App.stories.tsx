import type {Meta, StoryObj} from '@storybook/react';
import App from './App';
import {Provider} from 'react-redux';
import {store} from '../../store/store';
import ReduxStoreProviderDecorator from '../../stories/decorators/ReduxStoreProviderDecorator';

const meta: Meta<typeof App> = {
    title: 'Todolist/App',
    component: App,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    decorators:[ReduxStoreProviderDecorator]
};

export default meta;
type Story = StoryObj<typeof App>;

export const AppDefault: Story = {
    render:()=>
        <Provider store={store}>
            <App/>
        </Provider>
};

