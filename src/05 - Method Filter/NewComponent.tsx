import {Button} from './Button';
import React from 'react';
import {FilterValueType} from '../App';

export type MoneyType = {
    banknote: string
    nominal: number
    number: string
}

type NewComponentPropsType = {
    currentMoney: Array<MoneyType>
    filteredMoney: (filterValue: FilterValueType) => void
}

export function NewComponent(props: NewComponentPropsType) {
    return (
        <>
            <ul>
                {props.currentMoney.map((objFromMoneyArr, index) => {
                    return (
                        <li key={index}>
                            <span> {objFromMoneyArr.banknote}</span>
                            <span> {objFromMoneyArr.nominal}</span>
                            <span> {objFromMoneyArr.number}</span>
                        </li>
                    )
                })}
            </ul>
            <div style={{marginLeft: '30px'}}>
                <Button callback={() => props.filteredMoney('all')} name={'all'}/>
                <Button callback={() => props.filteredMoney('dollars')} name={'dollars'}/>
                <Button callback={() => props.filteredMoney('rubles')} name={'rubles'}/>
            </div>
        </>
    )

}