import type {Meta, StoryObj} from '@storybook/react';
import {EditableSpan, EditableSpanProps} from './EditableSpan';
import React, {ChangeEvent, memo, useState} from 'react';
import {action} from '@storybook/addon-actions';

const meta: Meta<typeof EditableSpan> = {
    title: 'Todolist/EditableSpan',
    component: EditableSpan,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        callback: {
            description: 'Changing the display mode to record changes',
            action: 'blur'
        }
    },
};

export default meta;
type Story = StoryObj<typeof EditableSpan>;

export const EditableSpanDefault: Story = {
    args: {
        oldTitle: 'Start value'
    }
};

const EditableSpanEditMode: React.FC<EditableSpanProps> = memo((props) => {
    const {oldTitle, callback} = props;

    const [editMode, setEditMode] = useState<boolean>(true);
    const [editableTitle, setEditableTitle] = useState(oldTitle);

    const changeEditMode = () => {
        setEditMode(!editMode);
        editMode && callback(editableTitle);
    }

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setEditableTitle(e.currentTarget.value);
    }

    return editMode
        ? <input
            value={editableTitle}
            autoFocus
            onBlur={changeEditMode}
            onChange={onChangeTitleHandler}/>
        : <span onDoubleClick={changeEditMode}>{oldTitle}</span>
        ;
});

export const EditableSpanEditModeStory: Story = {
    render: () =>
        <EditableSpanEditMode
            oldTitle={'Some value'}
            callback={action('Changing the display mode to record changes')}
        />
}
