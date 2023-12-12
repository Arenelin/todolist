import React, {useState} from 'react';
import './App.css';

function App() {
    let [a, setA] = useState(1);

    const incrementData = () => {
        setA(++a);
        console.log(a);
    }
    const clearData = () => {
        setA(0);
    }

    return (
        <div className="App">
            <h1>{a}</h1>
            <button onClick={incrementData}>+</button>
            <button onClick={clearData}>Clear</button>
        </div>

    );
}

export default App;
