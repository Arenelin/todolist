import React, {memo} from 'react';
import {useEditableSpan} from './hooks/useEditableSpan';

type EditableSpanProps = {
    title: string
    onChangeTitle: (title: string) => void
}

export const EditableSpan: React.FC<EditableSpanProps> = memo((props) => {
    const {title, onChangeTitle} = props;
    const {
        editMode,
        editableTitle,
        activateEditMode,
        activateViewMode,
        onChangeTitleHandler
    } = useEditableSpan(title, onChangeTitle)

    return (
        !editMode
            ? <span onDoubleClick={activateEditMode}>{title}</span>
            : <input
                value={editableTitle}
                autoFocus
                onChange={onChangeTitleHandler}
                onBlur={activateViewMode}
            />
    );
});
