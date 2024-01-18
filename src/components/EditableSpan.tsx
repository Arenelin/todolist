import React, {ChangeEvent, useState} from 'react';

type EditableSpanProps = {
    oldTitle: string
    callback: (title: string) => void
}

export const EditableSpan: React.FC<EditableSpanProps> = (props) => {
    const {oldTitle, callback} = props;

    const [editMode, setEditMode] = useState(false);
    const [editableTitle, setEditableTitle] = useState(oldTitle);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setEditableTitle(e.currentTarget.value);
    }

    const switchEditMode = () => {
        setEditMode(!editMode);
        editMode && callback(editableTitle);
    }

    return (
        editMode
            ? <input
                value={editableTitle}
                autoFocus
                onChange={onChangeHandler}
                onBlur={switchEditMode}
            />
            : <span onDoubleClick={switchEditMode}>{oldTitle}</span>
    );
};