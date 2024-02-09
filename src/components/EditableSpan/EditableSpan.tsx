import React, {ChangeEvent, memo, useState} from 'react';

type EditableSpanProps = {
    title: string
    onChangeTitle: (title: string) => void
}

export const EditableSpan: React.FC<EditableSpanProps> = memo((props) => {
    console.log('EditableSpan re-render')
    const {title, onChangeTitle} = props;

    const [editMode, setEditMode] = useState<boolean>(false);
    const [editableTitle, setEditableTitle] = useState<string>('');

    //Активация режима редактирования названия
    const activateEditMode = () => {
        setEditMode(true);
        setEditableTitle(title);
    }

    //Активация режима показа названия
    const activateViewMode = () => {
        setEditMode(false);
        onChangeTitle(editableTitle);
    }

    //Изменение локального стейта - названия
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setEditableTitle(e.currentTarget.value);
    }

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
