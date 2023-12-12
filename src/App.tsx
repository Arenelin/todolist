import React, {useState} from 'react';
import './App.css';
import {MoneyType, NewComponent} from './05 - Method Filter/NewComponent';

export type FilterValueType = 'all' | 'dollars' | 'rubles'


function App() {
    const [money, setMoney] = useState<Array<MoneyType>>([
        {banknote: 'dollar', nominal: 100, number: 'a123456789'},
        {banknote: 'dollar', nominal: 50, number: 'b123456789'},
        {banknote: 'ruble', nominal: 100, number: 'c123456789'},
        {banknote: 'dollar', nominal: 100, number: 'd123456789'},
        {banknote: 'dollar', nominal: 50, number: 'e123456789'},
        {banknote: 'ruble', nominal: 100, number: 'f123456789'},
        {banknote: 'dollar', nominal: 50, number: 'j123456789'},
        {banknote: 'ruble', nominal: 50, number: 'h123456789'}
    ]);
    const [filter, setFilter] = useState<FilterValueType>('all');

    const filteredMoney = (filterValue: FilterValueType) => {
        setFilter(filterValue);
    };

    const currentMoney = filter === 'rubles'
        ? money.filter(b => b.banknote === 'ruble')
        : filter === 'dollars'
            ? money.filter(b => b.banknote === 'dollar')
            : money

    return (
        <NewComponent currentMoney={currentMoney} filteredMoney={filteredMoney}/>
    );
}

export default App;
