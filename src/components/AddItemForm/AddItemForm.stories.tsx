import type {Meta, StoryObj} from '@storybook/react';
import {AddItemForm, AddItemFormProps} from './AddItemForm';
import React, {ChangeEvent, KeyboardEvent, memo, useState} from 'react';
import {Button} from '../Button';
import {action} from '@storybook/addon-actions'

const meta: Meta<typeof AddItemForm> = {
    title: 'Todolist/AddItemForm',
    component: AddItemForm,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        callback: {
            description: 'Button clicked inside form',
            action: 'clicked'
        }
    },
};

export default meta;
type Story = StoryObj<typeof AddItemForm>;

export const AddItemFormStory: Story = {};

const AddItemFormWithError: React.FC<AddItemFormProps> = memo((props) => {
    const {callback} = props;

    const [title, setTitle] = useState('');
    const [inputError, setInputError] = useState(true);

    const addTaskOnKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && title) {
            addTaskHandler();
        }
    }

    const addTaskHandler = () => {
        if (title.trim()) {
            callback(title.trim());

        } else {
            setInputError(true);
        }
        setTitle('');
    };

    const onChangeTaskTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        inputError && setInputError(false);
    }

    return (
        <div>
            <input value={title}
                   onChange={onChangeTaskTitle}
                   onKeyDown={addTaskOnKeyDownHandler}
                   className={inputError ? 'input-error' : ''}
            />

            <Button callback={addTaskHandler} title={'+'} disabled={!title}/>
            {inputError && <div className={'error'}>Error: title is required</div>}
        </div>
    );
});

export const AddItemFormWithErrorStory: Story = {
    render:()=><AddItemFormWithError callback={action('Button clicked inside form')}/>
};

//Историю можно писать через метод render (68 строка) или просто через объект args (25 строка)
// в argTypes мы описываем действия наших пропсов и их варианты отображения в документации с возможностью переключения, например, размера кнопки
//а в args каждой конкретной истории передаем пропсы и отображаем определенный сценарий компоненты