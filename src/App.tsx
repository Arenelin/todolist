import React, {useState} from 'react';
import './App.css';
import {Input} from './06 - Universal Input/components/Input';
import {Button} from './06 - Universal Input/components/Button';

function App() {
    const [message, setMessage] = useState([
            {message: 'message1'},
            {message: 'message2'},
            {message: 'message3'},
            {message: 'message4'},
            {message: 'message5'}
        ]
    );

    const [title, setTitle] = useState('');

    const addMessage = (messageTitle: string) => {
        const newMessage = {message: messageTitle};
        const newMessages = [newMessage, ...message];
        setMessage(newMessages);
    }

    const callbackClickHandler = () => {
        addMessage(title);
        setTitle('');
    }

    return (
        <div className="App">
            {/*<FullInput addMessage={addMessage}/>*/}
            <Input title={title} setTitle={setTitle}/>
            <Button name={'+'} callback={callbackClickHandler}/>
            {message.map((el, index) => {
                return (
                    <div key={index}>{el.message}</div>
                )
            })}
        </div>
    );
}

export default App;