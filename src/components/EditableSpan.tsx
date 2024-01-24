import React, {ChangeEvent, useState} from 'react';

type EditableSpanProps = {
    oldTitle: string
    callback: (title: string) => void
}

export const EditableSpan: React.FC<EditableSpanProps> = (props) => {
    const {oldTitle, callback} = props;

    const [editMode, setEditMode] = useState<boolean>(false);
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
};

