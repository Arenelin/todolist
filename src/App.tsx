import React from 'react';
import './App.css';
import {Header} from './01 - Nested components/Header';
import {Body} from './01 - Nested components/Body';
import {Footer} from './01 - Nested components/Footer';

function App() {
    return (
        <>
            <Header title="New Header"/>
            <Body titleForBody="New Body"/>
            <Footer titleForFooter="New Footer"/>
        </>
    );
}

export default App;
