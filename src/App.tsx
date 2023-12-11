import React from 'react';
import './App.css';
import {Button} from './03 - Universal button/components/Button';

function App() {

    // const Button1Foo = (name: string) => {
    //     console.log(`I am ${name}`)
    // }
    // const Button2Foo = (name: string) => {
    //     console.log(`I am ${name}`)
    // }
    //
    const buttonFoo = (subscriber: string, age: number, city: string) => {
        console.log(`${subscriber}, ${age}. ${city}`)
    }

    const showDefaultText = () => {
        console.log('I am stupid button');
    }

    return (
        <div className="App">
            <Button callback={() => buttonFoo('Hello! I am Vasya', 21, 'I live in Minsk.')}
                    name={'MyYouTubeChannel-1'}/>
            <Button callback={() => buttonFoo('Hello! I am Ivan', 35, 'I live in Novosibirsk.')}
                    name={'MyYouTubeChannel-2'}/>
            <Button callback={showDefaultText} name={'Stupid button'}/>
        </div>

    );
}

export default App;
