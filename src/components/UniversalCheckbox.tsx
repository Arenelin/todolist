import {ChangeEvent} from 'react';

type UniversalCheckboxProps = {
    checked: boolean
    onChange: (newValue: boolean) => void
}

export const UniversalCheckbox: React.FC<UniversalCheckboxProps> = (props) => {
    const {checked, onChange} = props;
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.currentTarget.checked)
    }
    return <input type="checkbox" checked={checked} onChange={onChangeHandler}/>
}