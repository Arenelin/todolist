import {ChangeEvent, useState} from 'react';

export const useEditableSpan = (   title: string, onChangeTitle: (title: string) => void)=>{

    const [editMode, setEditMode] = useState<boolean>(false);
    const [editableTitle, setEditableTitle] = useState<string>('');

    const activateEditMode = () => {
        setEditMode(true);
        setEditableTitle(title);
    }

    const activateViewMode = () => {
        setEditMode(false);
        onChangeTitle(editableTitle);
    }

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setEditableTitle(e.currentTarget.value);
    }

    return {
        editMode,
        editableTitle,
        activateEditMode,
        activateViewMode,
        onChangeTitleHandler
    }
}